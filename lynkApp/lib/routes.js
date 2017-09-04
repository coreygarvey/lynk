if(Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('home');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('root');
	});
}
FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()) {
		FlowRouter.go('root');
	}
}]);

FlowRouter.route('/', {
	name: 'root',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/home', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Home'});
	}
});

FlowRouter.route('/template-upload', {
	name: 'template-upload',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Templates'});
	}
});