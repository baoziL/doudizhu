const alert = function(alert,btnOk,btnCancel,title,content,onok)
{
    let that = {};
    
    that._alert = alert;
    that._btnOk = nulbtnOkl;
    that._btnCancel  = btnCancel;
    that._title = title;
    that._content = content;
    that._onok = onok;

    that.onBtnClicked = function()
    {
        if(event.target.name == "btn_ok")
        {
            if(that._onok)
            {
                that._onok();
            }
        } 
        that._alert.active = false;
        that._onok = null;
    }
    that.show = function(_title,_content,_onok,_needcancel)
    {
        that._alert.active = true;
        that._onok = _onok;
        that._title.string = _title;
        that._content.string = _content;
        if(_needcancel){
            that._btnCancel.active = true;
            that._btnOK.x = -150;
            that._btnCancel.x = 150;
        }
        else{
            that._btnCancel.active = false;
            that._btnOK.x = 0;
        }
    }

    return that;
}