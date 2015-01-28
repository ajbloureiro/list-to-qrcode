# List to QR Code
Takes a CSV List and iterates over each line to produce QR Codes

## Usage
1. cd into /list-to-qrcode directory
2. npm install
3. chmod +x index.js
4. ./index.js [path_to_csv/csv_list.csv] [path_to_image_folder]

**(required)** [path_to_csv/csv_list.csv] indicates the file to be processed.

**(optional)** [path_to_image_folder] if given, indicates the folder where the QR Codes should be saved. Its default value is '*[path_to_csv]/qr_images*'.
