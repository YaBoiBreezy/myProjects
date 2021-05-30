public class Desktop {
    double CPUSpeed;
    int RAM;
    int storage;
    boolean SSD;

    public Desktop(double CPUSpeed, int RAM, int storage, boolean SSD){ //constructor
        this.CPUSpeed=CPUSpeed;
        this.RAM=RAM;
        this.storage=storage;
        this.SSD=SSD;
    }
    public String toString(){   //returns string of data on desktop
        if (SSD){
            return "Desktop PC with  "+CPUSpeed+"ghz, "+RAM+"GB RAM, "+storage+"GB SSD drive.";
        }
        return "Desktop PC with  "+CPUSpeed+"ghz, "+RAM+"GB RAM, "+storage+"GB HDD drive.";
    }
}