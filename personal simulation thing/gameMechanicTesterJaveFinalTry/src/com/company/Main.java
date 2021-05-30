package com.company;
import java.util.ArrayList; // import the ArrayList class

ArrayList<String> cars = new ArrayList<String>(); // Create an ArrayList object


/*
    took old java code from other file, trying new method:
    amulet is 3-digit int instead of 3 shorts
    gonna make array of all values, go through it (makes things easier, one for loop instead of 3)
    try all options for one value, then "remove it" from the array, so no double checks in diff orders
 */

public class Main {
    static boolean[][] obsolete = new boolean[1000][1000];
    static int[] board = new int[999];
    static int[] amuletBank;
    static int best;
    static boolean obso;

    public static void main(String[] args) {
        for(int a=0;a<1000;a++){
            for(int b=0;b<1000;b++){
                obsolete[a][b]=(((a/100)<=(b/100) && (a/10%10)<=(b/10%10) && (a%10)<=(b%10)) || ((a/100)>=(b/100) && (a/10%10)>=(b/10%10) && (a%10)>=(b%10)));
            }
        }

        for (int max = 1; max <= 10; max++) {
            best=0;
            amuletBank = new int[(max*max*max)];
            int a=0;
            for (int x=0; x < max; x++){
                for (int y = 0; y < max; y++) {
                    for (int z = 0; z < max; z++) {
                        amuletBank[a++]=(x*100)+(y*10)+z;
                    }
                }
            }

            recurse(0,0);
            System.out.println("1-" + max + " = " + (best));
        }
    }

    //board stores all amulets, depth is for board size and best value
    //bankPos is so once you try all options for an amulet, you don't check it for any future attempts
    public static void recurse(int depth, int bankPos){
        if(depth>best){best=depth;printBoard(board,depth);}

        for(int x=bankPos;x<amuletBank.length;x++){
            obso=false;
            for(int y=0;y<depth;y++) {
                if(obsolete[amuletBank[x]][board[y]]) {
                    obso=true;
                    break;
                }
            }
            if(!obso){
                board[depth]=amuletBank[x];
                recurse(depth+1,x+1);
            }
        }
    }

    public static void printBoard(int[] board, int depth){
        System.out.print((depth)+"  ");
        for(int x=0;x<depth;x++){
            System.out.print(" ("+((board[x]/100)+1)+" "+((board[x]/10%10)+1)+" "+((board[x]%10)+1)+")");
        }
        System.out.println();
    }
}






