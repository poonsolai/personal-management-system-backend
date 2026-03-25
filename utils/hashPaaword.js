
import bcrypt from 'bcrypt'

function hassPassword(password){

    let salt = 10;

    let hass = bcrypt.hashSync(password, 10);
    
    return hass;

}
export function comparePassword(plain, hash){
    return bcrypt.compareSync(plain, hash);
}
export default hassPassword