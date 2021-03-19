declare let $: any;
class UIControl
{
    private CookieKey="Languge";
    public cv_Language;
    public TempUI={};//Key:URL,Value:UIstr
    public cv_default="Cht";
    constructor()
    {
        let Language = $.cookie(this.CookieKey);
        if (!Language || Language=="null")
        {
            Language = this.cv_default;
        }
        this.GetLanguage(Language);
    }
    private GetLanguage(Lan:string):void
    {
        $.ajax(
            {
                url: "./Language/" + Lan + ".json",
                type: 'GET',
                crossDomain: true, //跨網域問題
                cache: false, //不要快取
                async: false, //非同步
                success: (re) =>
                {
                    this.cv_Language = re;
                    return true;
                },
                error: (xmlhttprequest, textstatus, message) =>
                {
                    $.cookie(this.CookieKey, null);
                    alert("Get Language Error:" + Lan);
                    if(this.cv_default!=Lan)
                        this.GetLanguage(this.cv_default);
                    return false;
                }
            });
    }
    public SetLanguage(Language:string)
    {
        $.cookie(this.CookieKey, Language, {expires: 30});
        window.location.reload();
    };
    public GetUI(Url:string):string
    {
        let UI=null;
        if(!this.TempUI[Url])
        {
            $.ajax(
                {
                    url: Url,
                    type: 'GET',
                    crossDomain: true, //跨網域問題
                    cache: false, //不要快取
                    async: false, //非同步
                    success: (re) =>
                    {
                        UI = re;
                        this.TempUI[Url]=UI;
                    },
                    error: (xmlhttprequest, textstatus, message) =>
                    {
                        alert("Get UI Error:" + Url);
                    }

                });
        }
        else {
            UI=this.TempUI[Url];
        }
        if(!UI)
            return null;
        let Re:string=UI;
        let mach=Re.match(/\{\{(.*?)\}\}/g);
        let Keys=mach?$.unique(mach):[];
        for(var I in Keys)
        {
            let Key=Keys[I];
            let Val=this.cv_Language[Key.replace("{{","").replace("}}","")];
            if(!Val)
            {
                Val="UI Err:"+Key.replace("{{","").replace("}}","");
            }
            Re=Re.replace(Key,Val);
        }
        return Re;
    }
}