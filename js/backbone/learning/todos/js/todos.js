$(function(){
    var Todo = Backbone.Model.extend({
        defaults: function(){
            return {
                title: 'empty to do',
                order: 0,
                done: false
            }
        },
        toggle: function(){
            this.save({done: !this.get('done')})
        }
    })

    var Todos = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Backbone.LocalStorage('TodoLocalStorage'),
        done: function(){
            return this.where({done: true});
        },
        remaining: function(){
            return this.where({done: false});
        }
    })
    var todos = new Todos();

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        itemTemplate: _.template($('#item-template').html()),
        events: {
            'click .toggle': 'toggleDone',
            'click .destroy': 'clear',
            "dblclick .view"  : 'edit',
            "blur .edit"  : 'close'

        },
        initialize: function(){

            this.listenTo(this.model,'change',this.render);
            this.listenTo(this.model,'destroy',this.remove);
        },
        render: function(){
            this.$el.html(this.itemTemplate(this.model.toJSON()));
            this.$el.toggleClass('done',this.model.get('done'))
            this.input = this.$('.edit');
            return this;
        },
        toggleDone: function(){
            this.model.toggle();
        },
        clear: function(){
            this.model.destroy();
        },
        remove: function(){
            this.$el.remove();
        },
        edit: function(e){
            this.$el.addClass('editing')
            this.input.focus();
        },
        close: function(e){
            var val = this.input.val();
            if(!val) {
                this.input.val(this.model.get('title'));
            }else{
                this.model.save({title: val});
            }
            this.$el.removeClass('editing');
        }
    })

    var AppView = Backbone.View.extend({
        el: '#todoapp',
        stateTemplate: _.template($('#stats-template').html()),
        initialize: function(){
            this.main = $('#main');
            this.footer = $('footer');
            this.addInput = this.$('#new-todo');
            this.listenTo(todos,'add',this.addOne);
            //所有事件发生都能触发这个特别的事件，第一个参数是触发事件的名称。
            //为什么不能把此事件添加给add事件!!!!
            this.listenTo(todos,'all',this.render);

            todos.fetch();
        },
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearComplete'
        },
        render: function(){
            if(todos.length){
                var doneLength = todos.done().length;
                var remainingLength = todos.remaining().length;
                this.main.show();
                this.footer.show();
                this.footer.html(this.stateTemplate({done: doneLength, remaining: remainingLength}));
            }else{
                this.main.show();
                this.footer.hide();
            }
        },
        createOnEnter: function(e){
            var addInput = this.addInput;

            if(e.keyCode != 13) return;
            if(!$.trim(addInput.val())) return;

            todos.create({title: addInput.val()});
            this.addInput.val('');
        },
        clearComplete: function(){
            _.invoke(todos.done(),'destroy');
        },
        addOne: function(todo){
            //传递参数model
            var todoView = new TodoView({model: todo});
            this.$('#todo-list').append(todoView.render().el);
        }
    })

    var appView = new AppView();
})