
CZSVI.CzsviGraphController = CZSVI.BaseController.extend({});
CZSVI.CzsviGraphChController = CZSVI.BaseController.extend({});
CZSVI.CzsviGraphHiresController = CZSVI.BaseController.extend({});
CZSVI.CzsviGraphHiresChController = CZSVI.BaseController.extend({});
CZSVI.CzsviDenniSpotrebyController = CZSVI.DataDrivenTableController.extend({
    contract: 'czsvi', 
    resource: 'spotreby',
    middleProcessing: function(report) {
	for (var i = 0; i < report.body.length; i++) {
	    var day = report.body[i];
	    day['day'] = i+1 + ". " + this.month + ".";
	}
    },
    actions: {
	changeMonth: function(diff) {
	    var monthYear = new Date(this.year, this.month-1+diff, 1, 0,0,0);
	    if (this.year != monthYear.getFullYear()) this.set('year', monthYear.getFullYear());
	    if (this.month != monthYear.getMonth()+1) {
		this.set('month', monthYear.getMonth()+1);
	    }
	    this.reloadNative();
	}
    }
});
CZSVI.CzsviDenniSpotrebyChController = CZSVI.DataDrivenTableController.extend({
    contract: 'czsvi', 
    resource: 'spotrebych',
    middleProcessing: function(report) {
	for (var i = 0; i < report.body.length; i++) {
	    var day = report.body[i];
	    day['day'] = i+1 + ". " + this.month + ".";
	}
    },
    actions: {
	changeMonth: function(diff) {
	    var monthYear = new Date(this.year, this.month-1+diff, 1, 0,0,0);
	    if (this.year != monthYear.getFullYear()) this.set('year', monthYear.getFullYear());
	    if (this.month != monthYear.getMonth()+1) {
		this.set('month', monthYear.getMonth()+1);
	    }
	    this.reloadNative();
	}
    }
});

// Controllery odvozene od globalnich controlleru
CZSVI.CzsviAlarmsController = NU.AlarmsController.extend({contract: 'czsvi'});
CZSVI.CzsviOverviewController = NU.SchemaController.extend({schemaUrl: 'http://users.nordit.cz/eu/10400_Svitavy/__pic_sch_overview_CZSVI_DCBP__'});

CZSVI.CzsviAlarmsChController = NU.AlarmsController.extend({contract: 'czsvi', plc: 2});
CZSVI.CzsviOverviewChController = NU.SchemaController.extend({schemaUrl: 'http://users.nordit.cz/eu/10400_Svitavy/__pic_sch_overview_CZSVI_DCCH__'});
