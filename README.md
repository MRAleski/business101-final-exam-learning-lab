# Business 101 Final Exam Learning Lab - Final Adaptive Version

This is a GitHub Pages-ready, mobile-friendly learning tool for BUSN 101 Introduction to Business final exam preparation.

## What It Includes
- Module selector for targeted practice
- Consistent student sign-on name stored in browser localStorage
- Flashcards with definition, example, and common mistake
- Multi-round matching: 6, 8, then 10 items
- Weak-area matching based on prior performance
- True/False misconception checks
- Scenario-based questions
- Final Readiness Challenge with adaptive weak-area weighting
- Real-time progress bar and percent completion
- Dashboard with attempts, best score, terms mastered, and category performance
- Recommended Next Step based on weak areas
- Printable certificate
- Local instructor report with category trends and CSV download
- Automatic cleanup of locally stored practice events after 48 days

## Important Data Limitation
This tool uses browser localStorage only. That means:
- It does not require login.
- It works on GitHub Pages without a backend.
- Student data stays on the device/browser used.
- The instructor report is local to the browser/device and is not a class-wide analytics dashboard.

For class-wide reporting, use a Google Form, Canvas submission, or a backend database.

## Instructor Report
Open the tool and select Instructor Report. Default local passcode:

`BUSN101`

This is only a simple classroom barrier, not secure authentication. Do not store private student data in this tool.

## GitHub Pages Upload Steps
1. Create a GitHub repository.
2. Upload these files to the repository root:
   - index.html
   - style.css
   - script.js
   - terms.js
   - terms.json
   - README.md
3. Go to Settings > Pages.
4. Under Build and deployment, choose Deploy from branch.
5. Select main branch and root folder.
6. Save and wait for the GitHub Pages URL to publish.

## Canvas Embed Code
Replace the URL with your GitHub Pages URL.

```html
<div style="text-align:center; margin:20px 0;">
  <a href="https://YOURUSERNAME.github.io/YOUR-REPO/" target="_blank" style="background:#f4b942; padding:14px 22px; border-radius:8px; text-decoration:none; font-weight:bold; color:black;">Launch Learning Tool in Separate Window</a>
</div>
<div style="position: relative; width: 100%; height: 90vh; margin-top: 10px;">
  <iframe src="https://YOURUSERNAME.github.io/YOUR-REPO/" style="width: 100%; height: 100%; border: none; border-radius: 8px;"></iframe>
</div>
```

## External Link Option
In Canvas Modules, select Add Item > External URL, paste the GitHub Pages URL, and check Load in a new tab.

## Extra Credit Suggestion
- 15 points: Certificate submission
- 10 points: Feedback survey completion

## Design Notes
The tool uses retrieval practice, immediate feedback, error correction, repetition, and pattern recognition. Screens are intentionally segmented, with feedback placed next to the activity and limited text clutter.


## Version 3 Enhancement

The printable certificate now includes:
- Modules practiced
- Area for improvement, based on the lowest-performing tracked category

These values are generated from browser localStorage. Because this project uses GitHub Pages only, the certificate and instructor-style reporting remain local to the student/device unless students submit screenshots, PDFs, or a Google Form response.


## Version 4 Enhancements

Version 4 adds student-facing and instructor-facing improvements:

- Recommended Next Step after challenge completion
- Quick Weak-Area Review mode
- Most Missed Concepts summary
- Current streak indicator
- Time-on-task tracking stored locally
- Download My Results button that exports a JSON summary
- Certificate now includes time on task, along with modules practiced and area for improvement

### Important Data Note
This is still a GitHub Pages tool using browser localStorage only. That means student progress lives on the student's browser/device. For instructor review, students should submit their certificate and, if desired, the exported results JSON file in Canvas or report the same fields in a Google Form.
