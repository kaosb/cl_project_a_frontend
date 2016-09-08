(function ($, AdminLTE) {
  "use strict";

  var API = 'http://autocargo.coddea.com:4000/api/v1/car/search/';

  var filters = ['terrano', 'l200', 'dmax', 'amarok', 'ranger', 'navara', 'hilux', 'montana',
    'strada', 'saveiro', 'fiorino', 'partner', 'bipper', 'berlingo', 'kangoo', 'doblo'];

  for(var f in filters) {
    $('#filters').append('<option value="'+filters[f]+'">'+filters[f]+'</option>');
  }

  histogram.loadData(API+'terrano');
  $('#filters').on('change', function(event) {
    //$('#chart').html('<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>');
    histogram.loadData(API+this.value);
  });
})(jQuery, $.AdminLTE);
