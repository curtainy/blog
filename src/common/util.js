export function dateFormat(date){
  var d = new Date(date)
  return d.getFullYear() + '-'+ (d.getMonth()+1).toString().padStart(2,'0') + '-' + 
         d.getDate().toString().padStart(2,'0') + '  ' + d.getHours().toString().padStart(2,'0')  + ':' + 
         d.getMinutes().toString().padStart(2,'0') + ':' + d.getSeconds().toString().padStart(2,'0')
}