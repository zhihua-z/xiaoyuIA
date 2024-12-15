VERSION=$1
FILES="xiaoyuIABE api db.sqlite3 manage.py"

zip -r "${VERSION}.zip" ${FILES}
scp -i ~/Desktop/heiteacup.pem "${VERSION}.zip" ubuntu@ec2-18-143-22-125.ap-southeast-1.compute.amazonaws.com:~/"${VERSION}.zip"
rm "${VERSION}.zip"