import express, {Request, Response} from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome");
})

app.listen(4000, () => {
    console.log("server is running on port 4000");
});