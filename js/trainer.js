 $(function () {
     $.fn.raty.defaults.path = '../img';

     $('#function-star').raty({
         path: '../img',
         size: 24,
         starHalf: 'course_score03_m.png',
         starOff: 'course_score02_m.png',
         starOn: 'course_score01_m.png',
         target: '#function-hint',
         targetKeep: true,
         precision: true,
         score: 4.5,
         readOnly: true,
     });


 });