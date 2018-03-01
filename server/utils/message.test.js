let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'jen';
    let text = 'some message';
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  })

  it('should generate correct location object', () => {
    let from = "asd";
    let latitude = 13;
    let longitude = 12;
    let url = "https://www.google.com/maps?q=13,12";
    let message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});

  })
})
