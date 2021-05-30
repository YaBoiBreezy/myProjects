public class customer {
    String name;
    int age;
    float money;
    public customer (String initname, int initage, float initmoney){
        name=initname;
        age=initage;
        money=initmoney;
    }
    public float computeFee(){
        float fee=0;
        if (age>3 && age<18){
            fee=8.50f;
        }
        else if(age>65){
            fee= (float) ((12.75/2)+(12.75%2));
        }
        else{
            fee=12.75f;
        }
        return fee;
    }
}
