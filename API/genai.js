import { Client, handle_file } from "@gradio/client";
import { Router } from "express";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });


router.post("/Qwen2-VL-72B", upload.single("image"), async (req, res) => {
  try {
    const { text_input } = req.body;
    const client = await Client.connect("Qwen/Qwen2-VL");
    let history = [];
    let _chatbot = [];
    let imageResponse = null;

    // Check if an image is provided
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const imageName = req.file.originalname;
      
      // Use the file to create an image object and send it to the model
      imageResponse = await client.predict("/add_file", {
        history,
        file: new Blob([imageBuffer], { type: req.file.mimetype })
      });

      // Update the chatbot history with the image
      _chatbot.push([{ file: handle_file(imageBuffer), alt_text: null }, null]);
    }

    // Add the user's text input to the history
    if (text_input) {
      await client.predict("/add_text", {
        history,
        text: text_input
      });
      
      _chatbot.push([text_input, null]);
    }

    // Get the prediction from the model
    const result = await client.predict("/predict", {
      _chatbot
    });
    // console.log(result);

    // Respond with the prediction result
    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/llama70b", async (req, res) => {
  try {
    const client = await Client.connect("orionai/llama-3.1-70b-demo");
    const result = await client.predict("/predict", {
      user_message: req.body.text_input || "Hello!!",
    });
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/genai", async (req, res) => {
    const {text_input, model} = req.body;
  try {
    const client = await Client.connect("Shreyas094/SearchGPT");
    const result = await client.predict("/chat", {
      message: text_input || "Hello!!",
      model: model,
      temperature: 0.2, 		
		num_calls: 5, 		
		use_web_search: true, 		
		selected_docs: null, 
    });
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});



export default router;
