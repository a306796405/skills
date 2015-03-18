$(function(){
    var Todo = Backbone.Model.extend({
        /*defaults: {
            title: 'default name',
            done: false,
            //后期修改
            order: todos.getOrder()
        },*/
        // 可以在todos未初始化就使用 赞！！！
        defaults: function() {
            return {
                title: "empty todo...",
                order: todos.getOrder(),
                done: false
            };
        },
        toggle: function(){
            this.save({done: !this.get('done')});
        }
    })

    var Todos = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Backbone.LocalStorage('todoStorage'),
        done: function(){
            return this.where({done: true});
        },
        remaining: function(){
            return this.where({done: false});
        },
        getOrder: function(){
            if(!this.length){
                return 1;
            }else{
                return this.length + 1;
            }
        }
    })
    var todos = new Todos();

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        itemTemplate: _.template($('#item-template').html()),
        events: {
            'click .destroy': 'destroy',
            'click .toggle': 'toggle',
            'dblclick .view': 'edit',
            'blur .edit': 'blur'
        },
        initialize: function(){
            this.listenTo(this.model,'destroy',this.remove);
            this.listenTo(this.model,'change',this.render);
        },
        render: function(){
            this.$el.html(this.itemTemplate(this.model.toJSON()));
            //initialize先于render执行
            this.$el.toggleClass('done',this.model.get('done'));
            this.editInput = this.$('.edit');
            return this;
        },
        destroy: function(){
            this.model.destroy();
        },
        remove: function(){
            this.$el.remove();
        },
        toggle: function(){
            this.model.toggle();
        },
        edit: function(){
            this.$el.addClass('editing');
            this.editInput.focus();
        },
        blur: function(){
            if(!$.trim(this.editInput.val())){
                this.editInput.val(this.model.get('title'));
            }else{
                this.model.save({title: this.editInput.val()});
            }
            this.$el.removeClass('editing');
        }
    })

    var AppView = Backbone.View.extend({
        el: '#todoapp',
        statsTemplate: _.template($('#stats-template').html()),
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAll'
        },
        initialize: function(){
            this.addInput = $('#new-todo');
            this.main = $('#main');
            this.footer = $('footer');
            //让 object 监听 另一个（other）对象上的一个特定事件。
            // 不使用other.on(event, callback, object)，
            // 而使用这种形式的优点是：listenTo允许 object来跟踪这个特定事件，并且以后可以一次性全部移除它们。
            this.listenTo(todos,'add',this.addOne);
            this.listenTo(todos,'all',this.render);

            todos.fetch();
        },
        render: function(){
            var doneLen = todos.done().length;
            var remainingLen = todos.remaining().length;

            if(todos.length){
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({done: doneLen, remaining: remainingLen}));
            }else{
                this.main.hide();
                this.footer.hide();
            }

            $('#toggle-all').prop('checked',!remainingLen);
        },
        createOnEnter: function(e){
            if(e.keyCode != 13) return;

            var addVal = $.trim(this.addInput.val());
            if(!addVal) return;

            todos.create({title: addVal});
            this.addInput.val('');
        },
        addOne: function(model){
            //触发add事件 自动获取对应的Model 此处需要给TodoView传Model参数
            var todoView = new TodoView({model: model});
            $('#todo-list').append(todoView.render().el);
        },
        clearCompleted: function(){
            _.invoke(todos.done(),'destroy');
        },
        toggleAll: function(e){
            var isChecked = $(e.target).prop('checked');
            todos.each(function(model){
                model.save({done: isChecked})
            })

        }
    })

    var appView = new AppView();
})