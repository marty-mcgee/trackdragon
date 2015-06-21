// ChatExampleData.js

module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('messages', JSON.stringify([
      {
        id: 'm_1',
        threadID: 't_1',
        threadName: 'JuiceChat',
        authorName: 'Marty',
        text: 'Hey Patrick, want to give a Flux talk at JuiceChat?',
        timestamp: Date.now() -9876543210
      },
      {
        id: 'm_2',
        threadID: 't_1',
        threadName: 'JuiceChat',
        authorName: 'Linus',
        text: 'Seems like a pretty cool conference.',
        timestamp: Date.now() -876543210
      },
      {
        id: 'm_3',
        threadID: 't_1',
        threadName: 'JuiceChat',
        authorName: 'Patrick',
        text: 'Sounds good.  Will they be serving dessert?',
        timestamp: Date.now() -76543210
      },
      {
        id: 'm_4',
        threadID: 't_2',
        threadName: 'Sarah and Marty',
        authorName: 'Marty',
        text: 'Hey Sarah, want to grab a coffee after the conference?',
        timestamp: Date.now() -6543210
      },
      {
        id: 'm_5',
        threadID: 't_2',
        threadName: 'Sarah and Marty',
        authorName: 'Sarah',
        text: 'Absolutely !! Meet you at the coffee house.',
        timestamp: Date.now() -543210
      },
      {
        id: 'm_6',
        threadID: 't_3',
        threadName: 'Functional Heads',
        authorName: 'Marty',
        text: 'Hey Socrates, are you going to be talking about -||- functional stuff?',
        timestamp: Date.now() -43210
      },
      {
        id: 'm_7',
        threadID: 't_3',
        threadName: 'Marty and Socrates',
        authorName: 'Socrates',
        text: 'At JuiceChat?  Ya, I love cheese.  See you there !!',
        timestamp: Date.now()
      }
    ]));
  }

};
