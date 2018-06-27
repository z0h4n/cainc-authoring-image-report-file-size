# For CAINC - Authoring Platform

### Script for getting size of images from Lesson Image Report

- Clone this repository
- `cd` into the directory and run `npm install`

### `bulk` Command

If you have a `.csv` file you can use `npm run bulk <path_to_your_file>.csv`. There should exists a column with header(first row) having value as `Image` and value for each row for that column should be a stringified object in the format
```
{"file":"image-path"}
```
*Note: `https://dev-cdn.i-ready.com/instruction/content/` is used as a basepath for the `bulk` command and should not be included in csv file.*

### `one` Command

If you want to get file size of a single image, you can simply use `npm run one <image_url>`
