export const captureImage = async (webcamRef, setImgSrc, text, apiKey) => {
  const imageSrc = webcamRef.current.getScreenshot();
  setImgSrc(imageSrc);
  console.log(imageSrc);
  console.log(apiKey);

  const gpt = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      'model': 'gpt-4o',
      'messages': [
        {
          'role': 'user',
          'content': [
            {
              'type': 'text',
              'text': text
            },
            {
              'type': 'image_url',
              'image_url': {
                'url': imageSrc
              }
            }
          ]
        }
      ],
      'max_tokens': 600
    })
  });

  const response = await gpt.json();
  console.log(response);
};
