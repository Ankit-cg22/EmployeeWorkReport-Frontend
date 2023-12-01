export const BASE_BACKEND_URL = 'http://localhost:8080';

export const dropDownLinks = [
    {title : "Generate Reports" , link: "/report"} ,
    {title : "Add Team Members" , link : "/addTeamMember"} ,
    {title : "Remove Team Members" , link : "/removeTeamMember"} ,
    {title : "Promote Team Members" , link : "/promoteTeamMember"} 
]

export function convertToDateISOString(dateObject) {
    if (!dateObject || typeof dateObject !== 'object') {
      return null;
    }
  
    const year = dateObject["$y"];
    const month = dateObject["$M"] + 1; // Months are zero-based
    const day = dateObject["$D"];
  
    // Ensure that each part is two digits by adding leading zeros if needed
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  export function toHoursInDecimal(total_hours , total_minutes){
    return parseFloat((total_hours + total_minutes/60).toFixed(2) )
  }

export function findIdx(work_category){
  switch(work_category){
    case 'DEV' :
      return 0;
    case 'MEET' :
        return 1;
    case 'INTERVIEW' :
      return 2;
    case 'LEARN' :
      return 3;
    case 'OTHERS' :
      return 4;    
    case 'DOCS' :
      return 5;
  }
}