import java.io.*;
import java.util.Scanner;
public class PartImage {
    private boolean[][]	pixels;
    private boolean[][]	visited;
    private int	rows;
    private int	cols;

    //Creates a new, blank PartImage with the given rows (r) and columns (c)
    public PartImage(int r, int c) {
        rows = r;
        cols = c;
        visited = new boolean[r][c];
        pixels = new boolean[r][c];
    }

    //Creates a new PartImage containing rw rows and cl columns
    //Initializes the 2D boolean pixel array based on the provided byte data
    //A 0 in the byte data is treated as false, a 1 is treated as true
    public PartImage(int rw, int cl, byte[][] data) {
        this(rw,cl);
        for (int r=0; r<10; r++) {
            for (int c=0; c<10; c++) {
                if (data[r][c] == 1)
                    pixels[r][c] = true;
                else
                    pixels[r][c]= false;
                visited[r][c]=false;
            }
        }
    }

    public int getRows() { return rows; }
    public int getCols() { return cols; }
    public boolean getPixel(int r, int c) { return pixels[r][c]; }

    public void print() {
        for (int y=0;y<rows;y++){
            String line = "";
            for (int x=0;x<cols;x++){
                if (!pixels[y][x]){
                    line+="-";
                }
                else{
                    line+="X";
                }
            }
            System.out.println(line);
        }
    }

    public Point2D findStart() {
        for (int y=0;y<rows;y++){
            for (int x=0;x<cols;x++){
                if (pixels[y][x]) {
                    return new Point2D(x,y);
                }
            }
        }
        return null;
    }

    public int partSize() {
        int size=0;
        for (int y=0;y<rows;y++){
            for (int x=0;x<cols;x++){
                if (pixels[y][x]) {
                    size++;
                }
            }
        }
        return size;
    }

    private void expandFrom(int r, int c) {
        if (r>=0 && c>=0 && r<rows-1 && c<cols-1 && pixels[r][c]){
            pixels[r][c]=false;
            print();
            expandFrom(r-1,c);
            expandFrom(r,c-1);
            expandFrom(r+1,c);
            expandFrom(r,c+1);
        }
    }

    private int perimeterOf(int r, int c) {
        int edges=0;
        visited[r][c]=true;
        if (r>0){
            if (!pixels[r-1][c]){
                edges++;
            }
            else{
                if (!visited[r-1][c]){
                    edges+=perimeterOf(r-1,c);
                }
            }
        }
        if (c>0){
            if (!pixels[r][c-1]){
                edges++;
            }
            else{
                if (!visited[r][c-1]){
                    edges+=perimeterOf(r,c-1);
                }
            }
        }
        if (r<rows-1){
            if (!pixels[r+1][c]){
                edges++;
            }
            else{
                if (!visited[r+1][c]){
                    edges+=perimeterOf(r+1,c);
                }
            }
        }
        if (c<cols-1) {
            if (!pixels[r][c + 1]) {
                edges++;
            } else {
                if (!visited[r][c + 1]) {
                    edges += perimeterOf(r, c + 1);
                }
            }
        }
        if (r==0 || r==rows-1){
            edges+=1;
        }
        if (c==0 || c==cols-1){
            edges+=1;
        }
        return edges;
    }

    public boolean isBroken(){
        Point2D p = findStart();
        expandFrom(p.getX(), p.getY());
        return (partSize() != 0);
    }

    public int perimeter() {
        Point2D p = findStart();
        for (int y=0;y<rows;y++){
            for (int x=0;x<cols;x++){
                visited[y][x]=false;
            }
        }
        return perimeterOf((int)p.getX(), (int)p.getY());
    }

    public int countPieces(){
        int pieces = 0;
        /*
        while (findStart()!=null){
            pieces+=1;
            Point2D p = findStart();
            expandFrom((int)p.getX(), (int)p.getY());

        }*/
        return pieces;
    }

    public static PartImage readFromFile(String fileName) throws InvalidPartImageException{
        try {
            File inFile = new File(fileName);
            Scanner in = new Scanner(inFile);
            int cols=in.nextLine().length();
            int rows=1;
            while (in.hasNextLine()){
                if (in.nextLine().length()!=cols){
                    throw new InvalidPartImageException(fileName);
                }
                rows++;
            }
            in.close();
            in= new Scanner(inFile);
            PartImage part = new PartImage(rows,cols);
            boolean[][] data = new boolean[rows][cols];
            for (int y=0;y<rows-1;y++){
                String curLine = in.nextLine();
                for (int x=0;x<cols;x+=2){
                    if (curLine.substring(x,x+1).equals("0")){
                        data[y][x]=false;
                    }
                    else if (curLine.substring(x,x+1).equals("1")){
                        data[y][x]=true;
                    }
                    else{
                        throw new InvalidPartImageException(fileName);
                    }
                }
            }
            in.close();
            part.pixels=data;
            return part;
        } catch (FileNotFoundException e) {
            return null;
        } catch (IOException e) {
            return null;
        }
    }
}