public class Laptop {
    double CPUSpeed;
    int RAM;
    int storage;
    boolean SSD;
    int screenSize;

    public Laptop(double CPUSpeed, int RAM, int storage, boolean SSD, int screenSize){  //constructor
        this.CPUSpeed=CPUSpeed;
        this.RAM=RAM;
        this.storage=storage;
        this.SSD=SSD;
        this.screenSize=screenSize;
    }
    public String toString(){   //returns data on laptop
        if (SSD){
            return screenSize+'"'+" Laptop PC with  "+CPUSpeed+"ghz, "+RAM+"GB RAM, "+storage+"GB SSD drive.";
        }
        return screenSize+'"'+" Laptop PC with  "+CPUSpeed+"ghz, "+RAM+"GB RAM, "+storage+"GB HDD drive.";
    }
}