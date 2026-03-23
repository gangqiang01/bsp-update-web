#! /bin/bash
distDir="/var/www/html/m2mlink/dist"
webappIndexHtml="/root/JavaProject/m2m-core/leshan-mqtt-server-demo/src/main/resources/webapp/index.html"
webappStatic="/root/JavaProject/m2m-core/leshan-mqtt-server-demo/src/main/resources/webapp/m2mlink/static"
if [ -d "dist" ]; then
	rm -r dist
	echo "delete dish success"
fi
cnpm run build
echo "build success"
rm $webappIndexHtml
echo "rm index.html success"
rm -r $webappStatic
echo "rm static seccess"
cp $distDir"/index.html" $webappIndexHtml
cp -r $distDir"/static" $webappStatic
echo "cp success"
