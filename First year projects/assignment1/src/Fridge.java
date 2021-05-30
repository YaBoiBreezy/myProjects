public class Fridge {
    double Size;
    boolean Freezer;
    String Color;

    public Fridge(double Size, boolean Freezer, String Color){  //constructor
        this.Size=Size;
        this.Freezer=Freezer;
        this.Color=Color;
    }
    public String toString(){   //returns data on fridge
        if (Freezer){
            return Size+" cubic foot Fridge with Freezer ("+Color+").";
        }
        return Size+" cubic foot Fridge ("+Color+").";
    }
}