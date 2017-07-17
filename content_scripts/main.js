
  var Host = $(location).attr('host');

  var addressData = [];
  var temp_i = 0;
  $('input, select, textarea').each(
      function(index){ 

          if($(this).attr("id") == "House_Number_0_0" || $(this).attr("id") == "Direction_0_0"||$(this).attr("id") == "Street_Name_0_0" || $(this).attr("id") == "Direction_Suffix_0_0"||$(this).attr("id") == "Street_Type_0_0"){
            addressData[temp_i] = $(this) .val();
            temp_i ++;
          }
          
      }
  ); 
  
  var id_data = {};
  $('input, select, textarea').each(
    function(index){          
        id_data[$(this) .attr('id')] = $(this).val();		
    }
  );        
  
 
  var state_no = 0;
  var american_array =[
		['First_Name_0','wpfname'],		
		['Middle_Name_0','wpmname'],
		['Last_Name_0','wplname'],
		['Date_of_Birth_0','wpbdate'],		
		['Social_Security_No_0','wptin'],
		['Email_0','wpemail'],
		['Cellular_Phone_No_0','wpcphon'],
		['Home_Phone_No_0','wphphon'],
		['Reference_Contact_Name__0_0','1crname'],
		['Reference_Home_Phone_0_0','1crphone'],
		['Address_Years_0_0','wpadryr'],
		['Address_Months_0_0','wpadrmo'],
		['Ownership_Type_0_0','wphomet'],
		['','wpaddr1'],//note address;		
		['Reference_Relationship_0_0','1crrelat'],
		['Apt_Number_0_0','wpaddr2'],
		['City_0_0','wpcity'],
		['State_0_0','wpstate'],
		['Zip_Code_0_0','wpzip'],
		['Employer_Name_0_0','1ceena1'],
		['Employer_Current_Years_0_0','1eyrs'],
		['Employer_Current_Months_0_0','1emos'],
		['Employer_Title_0_0','1ceoccu'],
		['Employer_Gross_Income_0_0','1cenet'],
		['1ceoccu','1cepmtfreq'],//Note:
		['Employer_Phone_0_0','wpbphon'],
  ];

  var state_array= [
    ['AA',''],
    ['AE',''],
    ['AP',''],
    ['AK','2'],
    ['AL','1'],
    ['AR','4'],
    ['AS',''],
    ['AZ','3'],
    ['CA','5'],
    ['CO','6'],
    ['CT',''],
    ['DC','9'],
    ['DE','8'],
    ['FL','10'],
    ['FM',''],
    ['GA','11'],
    ['GU',''],
    ['HI','12'],
    ['IA','16'],
    ['ID','13'],
    ['IL','14'],
    ['IN','15'],
    ['KS','17'],
    ['KY','18'],
    ['LA','19'],
    ['MA','22'],
    ['MD','21'],
    ['ME','20'],
    ['MH',''],
    ['MI','23'],
    ['MN','24'],
    ['MO','26'],
    ['MP',''],
    ['MS','25'],
    ['MT','27'],
    ['MX',''],
    ['NC','33'],
    ['ND','35'],
    ['NE','28'],
    ['NH','30'],
    ['NJ','31'],
    ['NM','32'],
    ['NV','29'],
    ['NY',''],
    ['OH','36'],
    ['OK','37'],
    ['OR','38'],
    ['PA','39'],
    ['PR',''],
    ['PW',''],
    ['RI','41'],
    ['SC','42'],
    ['SD','43'],
    ['TN','44'],
    ['TX','45'],
    ['UT','46'],
    ['VA','47'],
    ['VI',''],
    ['VT',''],    
    ['WA','49'],
    ['WI','51'],
    ['WV','50'],
    ['WY','52'],
    ['AB',''],
    ['BC',''],
    ['MB',''],
    ['NB',''],
    ['NF',''],
    ['NS',''],
    ['NT',''],
    ['NU',''],
    ['ON',''],
    ['PE',''],
    ['QC',''],
    ['SK',''],
    ['YK','']
  ];
  for(var i = 0; i<= state_array.length-1; i ++)
  {
	  if(state_array[i][0] == $('[name=Reference_State_0_0]').val())
	  {
		  console.log(state_array[i][1])
		  state_no = state_array[i][1];
	  }	
	  
  }
  console.log(american_array.length)
  console.log(state_no)
 
  let pageData = {
    host: Host,
    data: id_data    
  }; 
  console.log("pageData", pageData)  
 // console.log("id_data", id_data)  
  //console.log("american_array", american_array) 
  //console.log("addressData", addressData) 
  //console.log("addressData", state_array)   
  browser.storage.local.set({pageData});
  browser.storage.local.set({addressData});
  browser.storage.local.set({american_array});
  browser.storage.local.set({state_array});
  browser.storage.local.set({state_no});
  alert("Correctly Copied Data") 
  // window.location.href = location.href;
 