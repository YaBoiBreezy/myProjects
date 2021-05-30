public abstract class Computer extends Product{
    private double cpuSpeed;
    private int ram;
    private boolean ssd;
    private int storage;

    Computer(double cpuSpeed, int ram, boolean ssd, int storage, double price, int stockQuantity){
        super(price, stockQuantity);
        this.cpuSpeed=cpuSpeed;
        this.ram=ram;
        this.ssd=ssd;
        this.storage=storage;
    }
    public double GetcpuSpeed(){
        return cpuSpeed;
    }
    public int Getram(){
        return ram;
    }
    public boolean Getssd(){
        return ssd;
    }
    public int Getstorage(){
        return storage;
    }
}
