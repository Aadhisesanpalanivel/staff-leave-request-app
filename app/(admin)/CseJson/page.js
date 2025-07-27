import cse from '@/public/cse.json'
const CseJson=()=>{
  return(
    <div className='cse-staff-container'>
    {cse.map((staff) => (
      
      <div key={staff.id} className='cse-staffs'>
      <img src={staff.photo}></img>
      <h1>{staff.name}</h1>
      <p>{staff.designation}</p>
      <p>{staff.phone}</p>
    <p>{staff.dob}</p>
    <p>{staff.email}</p>
    
     </div>
    ))}
    
  </div>
  )
}
export default CseJson