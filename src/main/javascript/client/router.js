
CZSVI.Router.map(function() {
  this.resource('lang', {path: '/:lang_id'}, function() {
    this.resource('contracts', function() {
      this.resource('contract', {path: "/:contract_id"}, function() {
	this.resource('czsvi.main');
	this.resource('czsvi', function() {
	  this.route('overview');
	  this.route('overviewCh');
	  this.route('graph');
	  this.route('graphCh');
	  this.route('graphHires');
	  this.route('graphHiresCh');
	  this.route('alarms');
	  this.route('alarmsCh');
	  this.route('denniSpotreby');
	  this.route('denniSpotrebyCh');
	  this.route('download');
	  this.route('downloadCh');
	});
      });
    });
  });
});

CZSVI.RootView = Ember.View.extend({
  init: function() {
    this._super();
    this.baseTemplateNameObserver();
  }
  , contract: 'czsvi'
  , baseTemplateNameObserver: function() {
    this.set('templateName', (this.baseTemplateName.match(/^\//) ? this.baseTemplateName : (this.contract + '||' + this.baseTemplateName)));
  }.observes('baseTemplateName')
})

CZSVI.CzsviMainView = CZSVI.RootView.extend({baseTemplateName: 'index/main'});
CZSVI.CzsviGraphView = CZSVI.RootView.extend({baseTemplateName: 'index/graph'});
CZSVI.CzsviGraphHiresView = CZSVI.RootView.extend({baseTemplateName: 'index/graphHires'});
CZSVI.CzsviDenniSpotrebyView = CZSVI.DataDrivenTableView.extend({filterView: CZSVI.MonthYearFilterView});
CZSVI.CzsviOverviewView = CZSVI.SchemaView.extend({});
CZSVI.CzsviGraphChView = CZSVI.RootView.extend({baseTemplateName: 'index/graphCh'});
CZSVI.CzsviGraphHiresChView = CZSVI.RootView.extend({baseTemplateName: 'index/graphHiresCh'});
CZSVI.CzsviDenniSpotrebyChView = CZSVI.DataDrivenTableView.extend({filterView: CZSVI.MonthYearFilterView});
CZSVI.CzsviOverviewChView = CZSVI.SchemaView.extend({});

// Filtry
CZSVI.MonthYearFilterView = CZSVI.RootView.extend({baseTemplateName: 'filter/monthYear'});

// Pohledy do ControlWebu
CZSVI.CzsviDownloadView = CZSVI.RootView.extend({baseTemplateName: '/cw/eu/10400_Svitavy/svitavy_download_DCBP_u2.htm'});
CZSVI.CzsviDownloadChView = CZSVI.RootView.extend({baseTemplateName: '/cw/eu/10400_Svitavy/svitavy_download_DCCH_u2.htm'});

// Pohledy odvozene od globalnich pohledu
CZSVI.CzsviAlarmsView = NU.AlarmsView.extend({});
CZSVI.CzsviAlarmsChView = NU.AlarmsView.extend({});
