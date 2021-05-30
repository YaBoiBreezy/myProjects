public class ToasterOven extends Appliance{
    private int width;
    private boolean convection;

    public ToasterOven(double price, int stockQuantity, int wattage, String color, String brand, int width, boolean convection){
        super(wattage, color, brand, price, stockQuantity);
        this.width=width;
        this.convection=convection;
    }
    public String toString(){
        if (convection){
            return width+" inch Toasty Toaster with convection ("+Getcolor()+", "+Getwattage()+" watts) ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
        }
        return width+" inch Toasty Toaster ("+Getcolor()+", "+Getwattage()+" watts) ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
    }
}