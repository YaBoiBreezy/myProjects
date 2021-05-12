package com.company;

/*
    took old java code from other file, removed pattern-based optimisations to run slower but fully
    thus checking all possibilities, guaranteed correct result to check faster version results
 */

public class Main {
    static boolean[][][][][][] obsoleteArr = new boolean[10][10][10][10][10][10];

    public static void main(String[] args) {
        short[][] board = new short[3][99];
        int best;

        //sets up a hashmap for the statement ((a<=d && b<=e && c<=f) || (a>=d && b>=e && c>=f))
        //which checks if either of a pair of amulets (a,b,c , d,e,f) makes the other one obsolete
        for(int a=0;a<10;a++){
            for(int b=0;b<10;b++){
                for(int c=0;c<10;c++){
                    for(int d=0;d<10;d++){
                        for(int e=0;e<10;e++){
                            for(int f=0;f<10;f++){
                                obsoleteArr[a][b][c][d][e][f]=((a<=d && b<=e && c<=f) || (a>=d && b>=e && c>=f));
                            }
                        }
                    }
                }
            }
        }

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






