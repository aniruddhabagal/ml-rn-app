import * as tf from '@xenova/transformers';

async function loadModel() {
  // Load pre-trained model from Hugging Face

  tf.env.useCachedModels = true;
  //   tf.env.localModelPath =
  //     '/src/models/Xenova/distilbert-base-uncased-finetuned-sst-2-english/';

  console.log('loading model...');

  try {
    const model = await tf.pipeline(
      'sentiment-analysis',
      'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
      {
        use_cache: true,
        quantized: true,

        // local_model_path: './src/models',
      },
    );

    console.log('model loaded!!');

    return model;
  } catch (e) {
    console.error('Error loading model:', e);
  }
}

async function getModelPrediction(model, inputText) {
  const result = await model(inputText, {
    src_lang: 'eng_Latn', // english
    tgt_lang: 'hin_Deva', // Hindi
  });
  return result;
}

export {loadModel, getModelPrediction};
