
var targetHost = $(location).attr('host');


var address = "";
var corespond_array ="";
var state_array = "";
var id_data = new Array();
var state_no = 0;
var flag = false;

$('input, select, textarea').each(
    function(index){      
        if($(this).attr("type") == "hidden" || $(this).attr("type") == "button")
        {
          return;
        }

        id_data[index] = $(this) .attr('id');
    }
);

var gettinAddress = browser.storage.local.get("addressData");
gettinAddress.then((results) => 
    { 
      address = results.addressData.join(" ")   
    }
);
    
var gettingcorespond_array = browser.storage.local.get("american_array");
    gettingcorespond_array.then((results) => 
      { 
        corespond_array = results.american_array   
      }
);
var gettingstate_array = browser.storage.local.get("state_array");
    gettingstate_array.then((results) => 
      { 
        state_array = results.state_array   
      }
);
var gettingstate_no = browser.storage.local.get("state_no");
    gettingstate_no.then((results) => 
      { 
        state_no = results.state_no   
      }
);

  

var gettingItem = browser.storage.local.get("pageData");                
gettingItem.then((results) => {   
	
    var pageData = results.pageData; 
	  
    if(targetHost == "sv1.americanfirstfinance.com:8158")
    {
  		for(var temp=0;temp < corespond_array.length;temp++)
  		{
    			for(var key in pageData)
          {
    			  var value = pageData[key];			  
    			  if(key != "host")
            {
      				var temp_value = value[corespond_array[temp][0]];
      				var phone = [];
      				if(corespond_array[temp][1] == "wpcphon" || corespond_array[temp][1] == "wphphon" || corespond_array[temp][1] == "1crphone" || corespond_array[temp][1] == "wpbphon")
              {
        					var phone_number  = getDigists(temp_value);    					
        					phone[0]    	= phone_number.substr(0, 3);
        					phone[1]  		= phone_number.substr(3, 3);
        					phone[2]   		= phone_number.substr(6, 4);    					
    					    document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = phone.join("-");    					    				
              }
      				else if(corespond_array[temp][1] == "wpaddr1")
              {
      					document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = address;
      				}
      				else if(corespond_array[temp][1] == "wphomet")
              {
        					if(temp_value == "2")	{
        						document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = "O";
        					}else if(temp_value == "1"){
        						document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = "R";
        					}else if(temp_value == "4") {
        						document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = "P";
        					}else if(temp_value == "5"){
        						document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = "T";
        					}else {
        						continue;
        					}
      				}
      				else{
      					document.getElementById("kwkFrame").contentWindow.document.getElementById("contentFrame").contentWindow.document.getElementById(corespond_array[temp][1]).value = value[corespond_array[temp][0]];						
      				}    							
    			  }    			  
    			}			
      }		
    }
   
    for (var i = id_data.length - 1; i >= 0; i--) {
        var targetId = id_data[i];   
        var sourceCategory = Getting_Id(pageData.host, targetId, targetHost);            
        var targetCategory = get_category(targetId, targetHost);
		 console.log("sourceCategory=", sourceCategory) 

		 console.log("targetId=", targetId,"pageData.data[sourceCategory.ids]=",pageData.data[sourceCategory.ids])
 
		if(!sourceCategory || !targetCategory){
			
			

            continue;
          } 
        
      if(!Array.isArray(sourceCategory.ids) && !Array.isArray(targetCategory.ids)){
          //1:1              
          if(targetId == "amount-input" && sourceCategory.ids == "Employer_Gross_Income_0_0")
          {
            var annual_income = pageData.data[sourceCategory.ids]*12;
            $("#" + targetId).val(annual_income);
            continue;
          }

          if(sourceCategory.ids == "Email_0" && targetId == "UC_Applicant_email" )
          {          
            var re_emailre_email = pageData.data[sourceCategory.ids];
            $("#UC_Applicant_email").val(re_emailre_email);
            $("#UC_Applicant_reInputemail").val(re_emailre_email);
            continue;
          } 

          if(sourceCategory.ids == "State_0_0" && targetId == "ctl00_ContentPlaceHolder1_state")
          {        
            $("#ctl00_ContentPlaceHolder1_state").val(pageData.data[sourceCategory.ids]);                 
            $("#ctl00_ContentPlaceHolder1_legal_res").val(pageData.data[sourceCategory.ids]);    			  
    			  continue;
          }  
          if(sourceCategory.ids == 'Ownership_Type_0_0' && targetId == "UC_Applicant_status_0")
          {
        	  if(pageData.data[sourceCategory.ids] == 2)
            {
        	    $('#UC_Applicant_status_0').click();
        	  }
        	  if(pageData.data[sourceCategory.ids] == 1){
        	    $('#UC_Applicant_status_1').click();
        	  }
          }		   
		  if(targetHost == 'easypayfinance.com' && targetId == "EmailAddress")
		  {

			$("#" + targetId).val(pageData.data[sourceCategory.ids]);
			$("#ConfirmEmailAddress").val(pageData.data[sourceCategory.ids]);
			continue;
		  }			
		  if(targetHost == 'easypayfinance.com' && targetId == "SelectedStateId")
          {	
			 console.log('state_no=',state_no);
			 $("#SelectedStateId").val(state_no);
			 continue;
			//
          } 
          if(sourceCategory.ids == "Employment_Status_0_0")
          {   
               if(pageData.data[sourceCategory.ids] == 1){
          
                $("#" + targetId).val("Employed");//.change();
               var element = document.getElementById("ctl00_ContentPlaceHolder1_employmentStatus");
                
                if ("createEvent" in document) {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    element.dispatchEvent(evt);
                }
                else
                    element.fireEvent("onchange");
                
              }
              if(pageData.data[sourceCategory.ids] == 2){
                $("#" + targetId).val("Retired");
                
              }
              
              if(pageData.data[sourceCategory.ids] == 5){
                $("#" + targetId).val("Self Employed");              
                
              }        
                        
              $("#ctl00_ContentPlaceHolder1_procedure").val("Pet Program");
              
              continue;
          }
              
		  
              
          switch(sourceCategory.name){          
            case "Social_security_no":              
               var security_number = getDigists(pageData.data[sourceCategory.ids])   ;               
               console.log("this soruceData = " + security_number);
               $("#" + targetId).val(security_number);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("999-99-9999", { "placeholder": "999-99-9999" });
               }
               continue;
               break;
    		case "Home_phone" :
               var phone_number = getDigists(pageData.data[sourceCategory.ids])                  
               console.log("this soruceData = " + phone_number);
               $("#" + targetId).val(phone_number);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("(999) 999-9999", { "placeholder": "(999) 999-9999" });
               }                              
               continue;
                break;
    		case "Cellular_phone" :
               var phone_number = getDigists(pageData.data[sourceCategory.ids])                  
               console.log("this soruceData = " + phone_number);
               $("#" + targetId).val(phone_number); 
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("(999) 999-9999", { "placeholder": "(999) 999-9999  " });
               }                             
               continue;
                break;
    		case "emp_work_phone" :
               var phone_number = getDigists(pageData.data[sourceCategory.ids])                  
               console.log("this soruceData = " + phone_number);
               $("#" + targetId).val(phone_number);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("(999) 999-9999", { "placeholder": "(999) 999-9999" });
               }                              
               continue;
                break;
            case "R_Home_phone" :
               var R_Home_phone = getDigists(pageData.data[sourceCategory.ids])                  
               console.log("this soruceData = " + R_Home_phone);
               $("#" + targetId).val(R_Home_phone);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("(999) 999-9999", { "placeholder": "(999) 999-9999" });
               }                              
               continue;
                break;
            case "Monthly_Gross_income" :
				
               var Monthly_Gross_income = getDigists(pageData.data[sourceCategory.ids])
				
               $("#" + targetId).val(Monthly_Gross_income);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("decimal", {
                    radixPoint: ".", groupSeparator: ",", digits: 2, autoGroup: true, removeMaskOnSubmit: true, "placeholder": "" 
                  });               
               }                                         
               continue;
                break;
    		case "Birth_day":
               var birth_day = getDigists(pageData.data[sourceCategory.ids])                  
               console.log("this soruceData = " + birth_day);
               $("#" + targetId).val(birth_day);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("mm/dd/yyyy", { "placeholder": "mm/dd/yyyy" });       
               }
               continue;                              
                break;
    		case "zip_code" :
               var zip_code = pageData.data[sourceCategory.ids];
               console.log("this soruceData = " + zip_code);
               $("#" + targetId).val(zip_code);
               if(targetHost == "secure.lendingusa.com"){
                 $("#" + targetId).inputmask("99999", { "placeholder": "99999" });       
               }
               continue;                              
                break;                                   
          } 
          $("#" + targetId).val(pageData.data[sourceCategory.ids]);  
    
      }else if(!Array.isArray(sourceCategory.ids) && Array.isArray(targetCategory.ids)){
		  
        var soruceData = pageData.data[sourceCategory.ids];
		   
        // 1: n        
        switch(sourceCategory.name){
          case "Birth_day":              
              var soruceData1 = soruceData.split("/");
              $("#" + targetCategory.ids[0]).val(soruceData1[0]);
              $("#" + targetCategory.ids[1]).val(soruceData1[1]);
              $("#" + targetCategory.ids[2]).val(soruceData1[2]);                            
              break;
          case "Social_security_no":   				
              var soruceData1 = soruceData.split("-");
              $("#" + targetCategory.ids[0]).val(soruceData1[0]);
              $("#" + targetCategory.ids[1]).val(soruceData1[1]);              
              $("#" + targetCategory.ids[2]).val(soruceData1[2]);               
              break;
          case "Home_phone" :               
               var phone_number = getDigists(soruceData)
               var phonearea = phone_number.substr(0, 3)
               var phonePreffix = phone_number.substr(3, 3)
               var phoneSuffix = phone_number.substr(6, 4)           
               
               $("#" + targetCategory.ids[0]).val(phonearea);
               $("#" + targetCategory.ids[1]).val(phonePreffix);
               $("#" + targetCategory.ids[2]).val(phoneSuffix);               
               
          case "Cellular_phone" :               
               var phone_number = getDigists(soruceData)
               var phonearea = phone_number.substr(0, 3)
               var phonePreffix = phone_number.substr(3, 3)
               var phoneSuffix = phone_number.substr(6, 4)           
               
               $("#" + targetCategory.ids[0]).val(phonearea);
               $("#" + targetCategory.ids[1]).val(phonePreffix);
               $("#" + targetCategory.ids[2]).val(phoneSuffix);			   
      			   if(targetHost == "easypayfinance.com")
      			   {
                  $("#ConfirmMobileNumber1").val(phonearea);
                  $("#ConfirmMobileNumber2").val(phonePreffix);
                  $("#ConfirmMobileNumber3").val(phoneSuffix); 
      			   }
               break;
          case "emp_work_phone" :

                var phone_number  = getDigists(soruceData)
                var phonearea     = phone_number.substr(0, 3)
                var phonePreffix  = phone_number.substr(3, 3)
                var phoneSuffix   = phone_number.substr(6, 4)           

                $("#" + targetCategory.ids[0]).val(phonearea);
                $("#" + targetCategory.ids[1]).val(phonePreffix);
                $("#" + targetCategory.ids[2]).val(phoneSuffix);
                
                break;  
        }

      }else if(Array.isArray(sourceCategory.ids) && !Array.isArray(targetCategory.ids)){
      //n:1
          switch(sourceCategory.name){
            case "Birth_day":                
                var valueArray1 = []; 
                var i =0;
                for(var key in sourceCategory.ids){                  
                  valueArray1[i] = pageData.data[sourceCategory.ids[key]];
                  i++;
                }                
                var value1 = valueArray1.join("/")                 
                $("#" + targetId).val(value1);                
                break;
            case "Social_security_no":                
                var valueArray1 = []; 
                var i =0;
                for(var key in sourceCategory.ids){                  
                  valueArray1[i] = pageData.data[sourceCategory.ids[key]];
                  i++;
                }                
                var value1 = valueArray1.join("")                 
                $("#" + targetId).val(value1); 
                break;
            case "Home_phone" :                              
                var valueArray1 = []; 
                var i =0;
                for(var key in sourceCategory.ids){
                  console.log(pageData.data[sourceCategory.ids[key]])
                  valueArray1[i] = pageData.data[sourceCategory.ids[key]];
                  i++;
                }                
                var value1 = valueArray1.join("")                 
                $("#" + targetId).val(value1);               
                break;
            case "House_Number":                
                $("#" + targetId).val(address)
                break;               
          }        
      }else{
       //n:n
        switch(sourceCategory.name){
          case "Birth_day":

            $("#" + targetCategory.ids[0]).val(pageData.data[sourceCategory.ids[0]]);
            $("#" + targetCategory.ids[1]).val(pageData.data[sourceCategory.ids[1]]);
            $("#" + targetCategory.ids[2]).val(pageData.data[sourceCategory.ids[2]]);              
            
            break;
          case "Social_security_no":                
            $("#" + targetCategory.ids[0]).val(pageData.data[sourceCategory.ids[0]]);
            $("#" + targetCategory.ids[1]).val(pageData.data[sourceCategory.ids[1]]);
            $("#" + targetCategory.ids[2]).val(pageData.data[sourceCategory.ids[2]]);              
            
            break; 
          case "Home_phone":                
            $("#" + targetCategory.ids[0]).val(pageData.data[sourceCategory.ids[0]]);
            $("#" + targetCategory.ids[1]).val(pageData.data[sourceCategory.ids[1]]);
            $("#" + targetCategory.ids[2]).val(pageData.data[sourceCategory.ids[2]]);              
            
            break;              
        }
      }
    }                      
});
 

if(targetHost == "url_a34"){
	$("#ctl00_ContentPlaceHolder1_procedure").val("Pet Program");
	$("#ctl00_ContentPlaceHolder1_radioIsPatient_0").attr('checked', true);
	$("#ctl00_ContentPlaceHolder1_radioIsPatient_0").click();
	$("#spanimgAgree1").click();
	$("#spanimgAgree2").click();
	$("#spanimgAgree3").click();	
	
	
	
}

if(targetHost == "url_a3"){
 $("#confirm1-checkbox").click();

} 

if(targetHost == "url_a2"){
	$("#Authorization").click();
	
}

if(targetHost == "url_a")
{ 
  $("#ctl00_ContentPlaceHolder1_procedure").val("Pet Program");
  $("#ctl00_ContentPlaceHolder1_employmentStatus").val("Employed").change();
  // alert(1)
}
 alert("Please Review All Information")

  