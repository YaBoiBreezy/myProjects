package com.company;
import java.util.LinkedList<E>

/*
    took old java code from other file, trying new method:
    amulet is 3-digit int instead of 3 shorts
    gonna make list of all values, go through it (makes things easier, one for loop instad of 3)
    try all options for one value, then remove it from the list, so no double checks in diff orders
 */

public class Main {
    static boolean[][] obsoleteArr = new boolean[1000][1000];
    static LinkedList<Integer> amuletBank = new LinkedList<Integer>();

    /*for (int i = 0; i < linkedList.size(); i++) {
            System.out.print(linkedList.get(i) + " ");
        }*/

    public static void main(String[] args) {
        short[][] board = new short[3][99];
        int best;

        //sets up a hashmap for the statement ((a<=d && b<=e && c<=f) || (a>=d && b>=e && c>=f))
        //which checks if either of a pair of amulets makes the other one obsolete
        for(int a=0;a<1000;a++){
            for(int b=0;b<1000;b++){
                obsoleteArr[a][b]=(((a/100)<=(d/100) && (b/10%10)<=(e/10%10) && (c%10)<=(f%10)) || ((a/100)>=(d/100) && (b/10%10)>=(e/10%10) && (c%10)>=(f%10)));
            }
        }
        System.out.println(obsoleteArr[555][984]+" "+obsoleteArr[333][789]);

        for (short max = 0; max < 10; max++) {
            best = -1;
            long startTime = System.nanoTime();

            for (short x=0;x<max;x++){
                for (short y = 0; y < max; y++) {
                    for (short z = y; z < max; z++) {
                        board[0][0] = x;
                        board[1][0] = y;
                        board[2][0] = z;
                        best = recurse(board, max, best, 1);
                    }
                }
            }
            long endTime = System.nanoTime();
            System.out.println("1-" + max + " = " + (best+1) +"    Time: "+((endTime-startTime)/1000000000.0f));
            System.out.println();
        }
    }

    public static boolean add(short[][] board, short x, short y, short z, int depth){
        for(int a=0;a<depth;a++){
            if(obsoleteArr[x][y][z][board[0][a]][board[1][a]][board[2][a]]){
                return false;
            }
        }
        board[0][depth]=x;
        board[1][depth]=y;
        board[2][depth]=z;
        return true;
    }

    public static int recurse(short[][] board, short max, int best, int depth){
        for(short x=0;x<max;x++){
            for(short y=0;y<max;y++){
                for(short z=0;z<max;z++){
                    if(add(board,x,y,z,depth)){
                        if(depth>best){best=depth;printBoard(board,depth);}
                        best=recurse(board,max,best,depth+1);
                    }
                }
            }
        }
        return best;
    }

    public static void printBoard(short[][] board, int depth){
        System.out.println(depth+1);
        for(int x=0;x<depth+1;x++){
            System.out.println("# ("+(board[0][x]+1)+" "+(board[1][x]+1)+" "+(board[2][x]+1)+")");
        }
    }
}






