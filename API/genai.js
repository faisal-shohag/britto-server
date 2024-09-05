import { Client } from "@gradio/client";
import { Router } from 'express';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.post('/qwen2', upload.single('image'), async (req, res) => {
    try {
        // Access the image buffer from the uploaded file
        const imageBuffer = req.file.buffer;

        // Convert the buffer to a Blob
        const exampleImage = new Blob([imageBuffer], { type: req.file.mimetype });

        // Connect to the Gradio client
        const client = await Client.connect("GanymedeNil/Qwen2-VL-7B");

        // Make the prediction using the in-memory image
        const result = await client.predict("/run_example", { 
            image: exampleImage,
            text_input: req.body.text_input || "Hello!!",
            model_id: "Qwen/Qwen2-VL-7B-Instruct",
        });

        // Respond with the prediction result
        res.status(200).json({ result: result.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/llama70b', async (req, res) => {
   try {
    const client = await Client.connect("orionai/llama-3.1-70b-demo")
    const result = await client.predict("/predict", { user_message: req.body.text_input || "Hello!!" })
    res.status(200).json({ result: result })
   } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
   }
})

export default router;
