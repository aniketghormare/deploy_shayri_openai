const express=require("express")
const cors=require("cors")
const app=express()
require("dotenv").config()
const { Configuration, OpenAIApi } =require("openai") ;
//const OPENAI_API_KEY="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"
app.use(express.json())
app.use(cors())
const configuration = new Configuration({
    
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
 
app.post("/api/gpt-3",async(req,res)=>{
    let question=req.body.question || 'How to use chatgpt?'
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate shayri on topic ${question} and give me shayri in hindi and english launguage .`,
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }).then(response=>{
        return response?.data?.choices?.[0].text;
      }).then((ans)=>{
        const arr=ans?.split("\n").filter(ele=>ele).map(value=>value.trim());
        return arr;
      })
      .then(response=>{

        res.json({
            answer:response,
            prompt:question
        })        
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`)
})