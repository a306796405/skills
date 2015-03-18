$(function(){
    var Employee = Backbone.Model.extend({
        initialize: function(){
            this.bind('invalid',function(model,error){
                alert('error: ' + error);
            })
        },
        validate:function(attrs){
            for(var key in attrs){
                if(attrs[key] == ''){
                    return key + "不能为空";
                }
                if(key == 'age' && isNaN(attrs.age)){
                    return "年龄必须是数字";
                }
            }
        }
    })

    var EmployeeList = Backbone.Collection.extend({
        model: Employee,
        localStorage: new Store('employeeStorage')
    })
    var employeeList = new EmployeeList();

    var EmployeeView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template($('#item-template').html()),
        events : {
            "dblclick td" : "edit",
            "blur input,select" : "close",
            "click .del" : "clear"
        },
        initialize: function(){
            this.render();
            //第三个参数可以为this提供一个context（上下文）
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.setVal();
        },
        setVal : function(){
            var model = this.model;
            this.input = $(this.el).find('input,select');
            this.input.each(function(){
                var input = $(this);
                input.val(model.get(input.attr("name")));
            });
        },
        edit: function(e){
            // 给td加上editing样式
            $(e.currentTarget).addClass('editing').find('input,select').focus();
        },
        close: function(e){
            var $currentTarget = $(e.currentTarget);
            var attrs = {};
            attrs[$currentTarget.prop('name')] = $currentTarget.val();
            this.model.save(attrs);
            $(e.currentTarget).closest('td').removeClass("editing");
        },
        clear: function(){
            this.model.destroy();
        },
        remove: function(){
            this.$el.remove();
        }
    })

    var AppView = Backbone.View.extend({
        el : $("#app"),
        events: {
            'click #add-btn': 'createOnEnter',
            'click #updateBtn': 'updateLastData'
        },
        initialize: function(){
            employeeList.bind('add', this.addOne, this);
            employeeList.bind('reset', this.addAll, this);
            employeeList.fetch();
        },
        createOnEnter : function(e) {
            var employee = new Employee();
            var attr = {};
            $('#emp-form input,#emp-form select').each(function(){
                var input = $(this);
                attr[input.attr('name')] = input.val();
            });
            // set方法中会自动调用model的validate方法进行校验，如果不通过则返回false
            if(employee.set(attr,{'validate': true})){
                employeeList.create(employee);
            }
        },
        //此方法表明backbone为单向绑定
        updateLastData: function(){
            if(employeeList.length){
                employeeList.last().save({sex: 1})
            }
        },
        addOne: function(employee){
            employee.set({eid: employee.get("eid")||employeeList.length});
            var employeeView = new EmployeeView({model: employee});
            $(".emp-table tbody").append(employeeView.el);
        },
        addAll : function(){
            employeeList.each(this.addOne);
        }
    })

    var appView = new AppView();
})