npm run build:embedded:development
mkdir ../pdfco/app/views/document_parser_templates/editor/

cp -a build-embedded/editor/index.html ../pdfco/app/views/document_parser_templates/editor/ 
rsync -avr --exclude="index.html" build-embedded/editor/ ../pdfco/public/editor/
