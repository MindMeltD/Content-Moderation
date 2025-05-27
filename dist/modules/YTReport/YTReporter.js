function grabAllYTComments(document) {
    return document.querySelectorAll("#contents > ytd-comment-thread-renderer");
}
function grabYTCommentText(comment) {
    let commentText = null;
    if (comment.querySelector("#content") !== null && comment.querySelector("#content") !== undefined) {
        commentText = comment.querySelector("#content")?.innerHTML ?? "Comment text not found";
    }
    return commentText;
}
function YTreportHateSpeech2(report) {
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
    else {
        let commentRenderer;
        commentRenderer = document.querySelector("#contents > ytd-comment-thread-renderer:nth-child(1)");
        // Isolate the text of the comment
        if (commentRenderer !== null && commentRenderer !== undefined) {
            let commentText = commentRenderer.querySelector("#content")?.innerHTML;
            let toxicityScore = evaluateToxicity(commentText); // Placeholder for toxicity score
        }
        else {
            console.error("Comment container not found");
            return;
        }
        // Handle comment report
        // click the three vertical dots button
        // Click the "Report" option
        // Select the "Hate Speech" option in the popup
        // Click the "Report" button
    }
}
function YTreportHateSpeech(selectedText) {
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
export {};
