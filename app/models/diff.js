import Ember from 'ember';

var comment = /^\\/,
    deleted = /^\-/,
    inserted = /^\+/;

export default Ember.Object.extend({
  lines: Ember.computed('rawLines', function() {
    var deletedLineNum = 1,
        insertedLineNum = 1,
        Line = this.container.lookupFactory('model:line');

    return this.get('rawLines').map(function(line) {
        if (comment.test(line)) {
          return Line.create({
            content: line,
            type: 'comment',
          });
        } else if (deleted.test(line)) {
          return Line.create({
            content: line,
            deletedLineNum: deletedLineNum++,
            type: 'deleted',
          });
        } else if (inserted.test(line)) {
          return Line.create({
            content: line,
            insertedLineNum: insertedLineNum++,
            type: 'inserted',
          });
        } else {
          return Line.create({
            content: line,
            deletedLineNum: deletedLineNum++,
            insertedLineNum: insertedLineNum++,
            type: 'unchanged',
          });
        }
      });
  })
});
