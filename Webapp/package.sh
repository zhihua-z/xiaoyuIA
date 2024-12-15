VERSION=$1
FILES="README.md package.json tsconfig.json eslint.config.js tsconfig.node.json index.html public vite.config.ts src tsconfig.app.json"

zip -r "${VERSION}.zip" ${FILES}
scp -i ~/Desktop/heiteacup.pem "${VERSION}.zip" ubuntu@ec2-18-143-22-125.ap-southeast-1.compute.amazonaws.com:~/"${VERSION}.zip"
rm "${VERSION}.zip"