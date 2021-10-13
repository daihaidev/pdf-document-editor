echo "--------------- START compiling build-embedded-development --------------- "
npm run build:embedded:development
echo "--------------- DONE compiling build-embedded-development --------------- "

echo "--------------- START compiling build-embedded-staging --------------- "
npm run build:embedded:staging
echo "--------------- DONE compiling build-embedded-staging --------------- "

echo "--------------- START compiling build-embedded-production --------------- "
npm run build:embedded:production
echo "--------------- DONE compiling build-embedded-production --------------- "


#cp -a build-embedded/editor/index.html ../pdfco/app/views/document_parser_templates/editor/ 
#rsync -avr --exclude="index.html" build-embedded/editor/ ../pdfco/public/editor/

echo "--------------- FINISHED --------------- "
echo "Now copy 'index.html' from build-.. to appropraite folder in /pdfco/app/views/document_parser_templates/editor"
echo "And the rest of files to /pdfco/public/editor/"