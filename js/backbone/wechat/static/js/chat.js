$(function(){
    WEB_SOCKET_SWF_LOCATION = "/static/WebSocketMain.swf";
    WEB_SOCKET_DEBUG = true;

    var socket = io.connect();
    socket.on('connect', function(){
        console.log('connected');
    });

    /* Model S */
    $(window).bind("beforeunload", function() {
        socket.disconnect();
    });

    var User = Backbone.Model.extend({
        urlRoot: '/user'
    })

    var Topic = Backbone.Model.extend({
        urlRoot: '/topic'
    })

    var Message = Backbone.Model.extend({
        urlRoot: '/message'
    })
    /* Model E */

    /* Collection S */
    var Topics = Backbone.Collection.extend({
        model: Topic,
        url: '/topic'
    })
    var topics = new Topics;

    var Messages = Backbone.Collection.extend({
        model: Message,
        url: '/message'
    })
    var messages = new Messages;
    /* Collection E */

    /* View S */
    var TopicView = Backbone.View.extend({
        tagName: 'div class="column"',
        template: _.template($('#topic-template').html()),
        events: {
            'click .close' : 'close'
        },
        initialize: function(){
            this.listenTo(this.model,'destroy',this.remove);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        close: function(){
            this.model.destroy();
        },
        remove: function(){
            this.$el.remove();
        }
    })
    var MessageView = Backbone.View.extend({
        tagName: 'div class="comment"',
        template: _.template($('#message-template').html()),
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })
    var UserView = Backbone.View.extend({
        el: '#user_info',
        username: $('#username'),
        show: function(username){
            this.username.html(username);
            this.$el.show();
        }
    })
    var AppView = Backbone.View.extend({
        el: '#main',
        topic_list:$("#topic_list"),
        topic_section:$("#topic_section"),
        message_section:$("#message_section"),
        message_list:$("#message_list"),
        message_head:$("#message_head"),
        events: {
            'click .submit_topic': 'saveTopic'
        },
        initialize: function(){
            //不明白
            _.bindAll(this, 'addTopic', 'addMessage');
            this.listenTo(topics,'add',this.addTopic);

            this.message_pool = {};
            this.socket = null;

            this.message_list_div = document.getElementById('message_list');
        },
        showTopic: function(){
            topics.fetch();
            this.topic_section.show();
            this.message_section.hide();
            this.message_list.html('');
        },
        addTopic: function(model){
            var topicView = new TopicView({model: model});
            this.topic_list.append(topicView.render().el);
        },
        saveTopic: function(){
            var topic_title = $('#topic_title');
            if(topic_title.val() === ''){
                alert('主题不能为空！');
                return false
            }
            var topic = new Topic({
                title: topic_title.val()
            });
            self = this;
            topic.save(null,{
                success: function(model, resp, options){
                    topics.add(resp);
                    topic_title.val('');
                },
                error: function(model, resp, options){
                    alert(resp.responseText);
                }
            })
        },
        initMessage: function(topic_id){
            var messages = new Messages();
            this.listenTo(messages,'add',this.addMessage);
            this.message_pool[topic_id] = messages;
        },
        showMessage: function(topic_id){
            this.initMessage();
            this.message_section.show();
            this.topic_section.hide();

            var messages = this.message_pool[topic_id];

            // 进入房间 不太理解
            socket.emit('topic', topic_id);
            // 监听message事件，添加对话到messages中
            socket.on('message', function(response) {
                messages.add(response);
            });

            messages.fetch({
                data: {topic_id: topic_id},
                success: function(resp) {
                    //js报错
                    //self.message_list.scrollTop(self.message_list_div.scrollHeight);
                },
                error: function(model, resp, options) {
                    alert(resp.responseText);
                }
            });
        },
        addMessage: function(message){
            //self是哪里来的
            var view = new MessageView({model: message});
            this.message_list.append(view.render().el);
            //js报错
            //self.message_list.scrollTop(self.message_list_div.scrollHeight);
        },
        showMessageHead: function(topic_id) {
            var topic = new Topic({id: topic_id});
            self = this;
            topic.fetch({
                success: function(resp, model, options){
                    self.message_head.html(model.title);
                },
                error: function(model, resp, options) {
                    alert(resp.responseText);
                }
            });
        }
    })
    var LoginView = Backbone.View.extend({
        el: '#login',
        wrapper: $('#wrapper'),
        events: {
            'keypress #login_pwd': 'loginEvent',
            'click .login_submit': 'login'
        },
        hide: function(){
            this.wrapper.hide();
        },
        show: function(){
            this.wrapper.show();
        },
        loginEvent: function(e){
            if(e.keyCode == 13){
                this.login();
            }
        },
        login: function(){
            var username = $('#login_username').val();
            var pwd = $('#login_pwd').val();
            var user = new User({
                username: username,
                password: pwd
            });
            user.save(null,{
                url: '/login',
                success: function(model,resp,options){
                    //全局变量 需要吗
                    g_user = resp;
                    appRouter.navigate('index',{trigger: true});
                },
                error: function(model, resp, options) {
                    alert(resp.responseText);
                }
            });
        }
    })
    /* View E */

    /* Router S */
    var AppRouter = Backbone.Router.extend({
        routes: {
            'index': 'index',
            'topic/:id': 'topic'
        },
        initialize: function(){
            //为什么要在此处初始化
            this.appView = new AppView();
            this.loginView = new LoginView();
            this.userView = new UserView();
            //这个到底有啥用
            this.indexFlag = false;
        },
        index: function(){
            if(g_user && g_user.id != undefined ){
                this.appView.showTopic();
                this.loginView.hide();

            }
        },
        login: function(){
            this.loginView.show();
        },
        topic: function(){
            this.userView.show();
            this.loginView.hide();
            this.appView.showMessage();
            this.indexFlag = true;  // 标志已经到达主页了
        }
    })

    var appRouter = new AppRouter();
    var g_user = new User();
    g_user.fetch({
        success: function(model,resq,options){
            g_user = resq;
            Backbone.history.start({pustState:true});
            if(g_user === null || g_user.id === undefined){
                appRouter.navigate('login',{trigger: true});
            }else{
                appRouter.navigate('index',{trigger: true});
            }
        },
        error: function(){
            alert(resp.responseText);
        }
    })
    /* Router E */


})