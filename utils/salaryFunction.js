function getSalary(department, role){
    switch(department.toLowerCase()){
        case "hr" :
            if(role == 'Hr Executive'){
                return 35000
            }else if(role == 'Hr Manager'){
                return 60000
            }else if(role == 'Training'){
                return 30000
            }else if(role == 'HR Business Partner'){
                return 45000
            }else if(role == 'HR Generalist'){
                return 30000
            }
            break;
        case "development" :
            if(role == 'Software Developer'){
                return 130000
            }else if(role == 'Frontend Developer'){
                return 70000
            }else if(role == 'Backend Developer'){
                return 110000
            }else if(role == 'Test Engineer'){
                return 50000
            }else if(role == 'Mobile App Developer'){
                return 140000
            }
            break;
        case "marketing" :
            if(role == 'Digital Marketing Specialist'){
                return 50000
            }else if(role == 'Market Executive'){
                return 60000
            }else if(role == 'SEO Analyst'){
                return 45000
            }else if(role == 'Content Writer'){
                return 20000
            }else if(role == 'Brand Manager'){
                return 40000
            }else if(role == 'Marketing Manager'){
                return 70000
            }
            break;
        case "sales" :
            if(role == 'Sales Manager'){
                return 120000    
            }else if(role == 'Sales Executive'){
                return 50000
            }else if(role == 'Account Manager'){
                return 40000
            }else if(role == 'Relationship Manager'){
                return 60000
            }
            break;
        default :
            return null
    }
};

export default getSalary;