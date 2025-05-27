// import { createPrinter } from "typescript";
import "../evaluateToxicity"; // Placeholder for toxicity evaluation function
import evaluateToxicity from "../evaluateToxicity";

interface YTReportData {
    type: "video" | "comment";
    contentUrl: string;
    contentText?: string;
    reason: string;
}

function grabAllYTComments(document: Document): NodeListOf<HTMLElement> {

    return document.querySelectorAll("#contents > ytd-comment-thread-renderer");
}

function grabYTCommentText(comment: HTMLElement): string | null {

    let commentText: string | null = null;

    if (comment.querySelector("#content") !== null && comment.querySelector("#content") !== undefined) {
        commentText = comment.querySelector("#content")?.innerHTML ?? "Comment text not found";
    }

    return commentText;
}



function YTreportHateSpeech2(report: YTReportData) {
    // Log the report locally oron your backend
    console.log("Reporting hate speech:", report);

    if (report.type === "video") {
        console.log("Unsupported video report:", report.contentUrl);
        // Handle video report
        // click the ... button under the video
        // Click the "Report" option
        // Select the "Hate Speech" option in the popup
        // Click the "next" button
        // Write "hate speech" in the text box
        // Click the report button
        // click the "Ok" button to close the popup
    }
    else{
       let commentRenderer: HTMLElement | null;
        commentRenderer = document.querySelector("#contents > ytd-comment-thread-renderer:nth-child(1)");

        // Isolate the text of the comment
        if (commentRenderer !== null && commentRenderer !== undefined) {
            let commentText: string = commentRenderer.querySelector("#content")?.innerHTML ?? "";
            let toxicityScore: number = evaluateToxicity(commentText); // Placeholder for toxicity 
            return toxicityScore;
        }
        else{
            console.error("Comment container not found");
            return;
        }

        // Handle comment report
        // click the three vertical dots button
        // Click the "Report" option
        // Select the "Hate Speech" option in the popup
        // Click the "Report" button
    }

    return
}

function YTreportHateSpeech(selectedText: string) {

    fetch("https://your-endpoint.example/report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: selectedText,
            url: window.location.href
        })
    }).catch(err => console.error("Report failed", err));
}

export { YTreportHateSpeech, YTreportHateSpeech2, grabAllYTComments, grabYTCommentText };