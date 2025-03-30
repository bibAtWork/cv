# CV Builder

This repository helps to automatically build a professionally looking CV, without the formatting hassle.

**Key features**

- Data can be exported from existing LinkedIn Profiles
- CV can be customized by multiple themes
- CV can be published as webpage or PDF

## Open Source Projects in Use (Main Projects)

- [json-resume](https://github.com/jsonresume)
- [resumed](https://github.com/rbardini/resumed)

## Setup

1. Install Node.js
2. Install the required resume parser. You can choose between [resume-cli](https://github.com/jsonresume/resume-cli) and [resumd](https://github.com/rbardini/resumed). I chose `resumd`as it is still actively maintained:<br>
`npm install resumed`
3. Choose theme you want to use from the [Themes Registry](https://jsonresume.org/themes). Install the theme with the following command:<br>
`npm install -g jsonresume-theme-elegant`
4. Verify your json file with:<br>
`resumed validate src/main/resources/resume.json`
5. Export your resume as html with:<br>
`resumed export src/main/resources/resume.json --theme jsonresume-theme-elegant --output target/resumejson/resume.html`
6. (Optional) Export your resume as [pdf](https://stackoverflow.com/questions/57372555/how-can-i-download-my-json-resume-as-pdf-on-my-gist) with:<br>
`resume export --resume src/main/resources/resume.json --theme jsonresume-theme-elegant --format pdf target/resumejson/resume.pdf`

**last tested with the following component versions:**

- Node.js:  v20.17.0
- npm:      10.8.2
- node:     20.17.0
- resumed:  10.8.2
- Chrome JSON Resume Exporter: 3.2.3

## Themes

1. [Kendall Theme](https://registry.jsonresume.org/thomasdavis?theme=kendall)
2. [Elegant Theme](https://registry.jsonresume.org/thomasdavis?theme=elegant)
3. [Relaxed Theme](https://registry.jsonresume.org/thomasdavis?theme=relaxed)
4. [Stack Overflow Theme](https://registry.jsonresume.org/thomasdavis?theme=stackoverflow)

## Lessons Learned

- attributes in resume.json must be filled or removed, a key with an empty value (e.g. "" or null) is not allowed
- the elegant theme does not support the attribute "image", instead it uses "picture" \(see [Issue 149](https://github.com/mudassir0909/jsonresume-theme-elegant/issues/149), [Issue 158](https://github.com/mudassir0909/jsonresume-theme-elegant/issues/158))
- to include local images they must be referenced as relative path with  "http://" prefix \(see [Issue 258](https://github.com/jsonresume/resume-cli/issues/258)). As an alternative, you can upload your images to a publicly available hosting service (e.g., GitHub) and reference them with their URL.
- Exporting your CV as PDF leads to not so nice page breaks, this is caused by the HTML to PDF conversion. Multiple solutions have been discussed ([Issue-385](https://github.com/jsonresume/resume-cli/issues/385), [Issue-413](https://github.com/jsonresume/resume-cli/issues/413#issuecomment-750454100)), but no satisfying solution has been found yet.

## ToDo's
* Configure automatic rendering and pdf export with resumd-cli (see [here](https://github.com/rbardini/resumed/tree/main/examples/with-pdf-export))

## Ideas

1. Create Github Action to automatically build and deploy resume
2. Export the CV as PDF without manual interaction (currently the CV must be manually exported with Opera Browser function "save as pdf")
3. Automatically transfer elements from summary to high lights based on keywords
4. Cluster Skills based on LLM
5. Add chart to visualize skills as chart (e.g., net chart)

## References

- [Online CV Preview](https://registry.jsonresume.org/bibAtWork?theme=kendall)
- [Theme Registry](https://jsonresume.org/themes)
- [JSON Schema Preview](https://jsonresume.org/schema)

## Key Words
\#CV \#Resume \#Profile  \#JsonResume \#ResumeParser \#ResumeBuilder \#ResumeExport \#PersonalWebpage
