//application title name
const APPLICATIONTITLE = "WISE-PaaS/AppHub Repo"
//footer release time
const RELEASEDATE ="20260105";
const POWER = "WISE-PaaS";
const VERSION ="Version 4.0.1";

//app max size 300M
const APPMAXLENGTH = 5*1024*1024*1024;
//bsp max size 10G
const BSPMAXLENGTH = 5*1024*1024*1024;
//file max size 2G
const FILEMAXLENGTH = 5*1024*1024*1024;
//yaml max size 2M
const YAMLMAXLENGTH = 1024*1024*2;
//exe file size 2G
const EXEMAXLENGTH = 5*1024*1024*1024;
//deb file size 2G
const DEBMAXLENGTH = 5*1024*1024*1024;
//tar file size 2G
const TARMAXLENGTH = 5*1024*1024*1024;
//zip file size 2G
const ZIPMAXLENGTH = 5*1024*1024*1024;
//deploy file type
const BOOTANIMATIONTYPE = "bootanimation";
const FILETYPE = "deploy";
//linux package type
const DEBTYPE="deb";
const TARTYPE="tar";
//window package type
const EXETYPE = "exe";
const ZIPTYPE = "zip";
//docker package type
const DOCKERTYPE = "docker";

//cloud status type
const APPTYPE = "apk";
const BSPTYPE = "bsp";
//os type
const ANDROIDOS = "android";
const LINUXOS = "linux";
const WINDOWSOS = "windows";

//max tag count
const MAXTAGCOUNT = 5;
const DEFAULTTAG = ["arm", "arm64", "i386", "amd64"];


//storage type
const AZURETYPE= "azure";
const OSSTYPE = "oss";
const LOCALTYPE = "local";

const FILEFORMAT = {
    img: "img",
    video: "video",
    audio: "audio",
    pkg: "package",
    cdsApp: "cdsapp",
    other: "other",
    exe:"exe"
}

const ATTENTIONTYPE = {
    app: "app",
    androidOs : "android",
    linuxDeb: "deb",
    linuxCompress: "tar",
    linuxOs: "linux",
    windowsExe: "exe",
    windowsZip: "zip",
    windowsOs: "windows",
    dockerCompose: "Compose",
    dockerSwarm: "Swarm",
    bootanimation:"bootanimation",
    file: "deploy"

}

export {
    APPLICATIONTITLE as applicationTitle,
    APPMAXLENGTH as appMaxLength,
    BSPMAXLENGTH as bspMaxLength,
    RELEASEDATE as releaseDate,
    POWER as power,
    FILEMAXLENGTH as fileMaxLength, 
    BOOTANIMATIONTYPE as bootanimationType,
    FILETYPE as fileType,
    FILEFORMAT as fileFormat,
    VERSION as version,
    YAMLMAXLENGTH as yamlMaxLength,
    EXEMAXLENGTH as exeMaxLength,
    DEBMAXLENGTH as debMaxLength,
    TARMAXLENGTH as tarMaxLength,
    ZIPMAXLENGTH as zipMaxLength,
    DEBTYPE as debType,
    TARTYPE as tarType,
    EXETYPE as exeType,
    ZIPTYPE as zipType,
    APPTYPE as appType,
    BSPTYPE as bspType,
    ANDROIDOS as androidOs,
    LINUXOS as linuxOs,
    WINDOWSOS as windowsOs,
    DOCKERTYPE as dockerType,
    TAGTYPE as tagType,
    MAXTAGCOUNT as maxTagCount,
    DEFAULTTAG as defaultTag,
    AZURETYPE as azureType,
    OSSTYPE as ossType,
    LOCALTYPE as localType,
    ATTENTIONTYPE as attentionType,
}

