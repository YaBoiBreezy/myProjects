import csv
import pygame
import sys
import random
from pygame.locals import *
SCREENWIDTH=800
SCREENHEIGHT=600
zombieface=pygame.image.load("headFocus.PNG");
frame_rate=40;

def inputs(closed_flag):
    keybd_tupl=pygame.key.get_pressed()
    mouse_pressed=pygame.mouse.get_pressed()
    mouse_pos=pygame.mouse.get_pos()
    for event in pygame.event.get():
        if event.type==pygame.QUIT:
            closed_flag=True
    return mouse_pressed,mouse_pos, keybd_tupl, closed_flag;


def read_csv(file_name):
    array=[]
    csvfile=open(file_name)
    f = csv.reader(csvfile)
    for line in f:
        array.append(line)
    csvfile.close()
    return array
    
class Sprite(pygame.sprite.Sprite):
    image=zombieface;
    
def render(map, entities,screen,sprite):
    renderBackground(map,screen)
    renderEntities(entities,screen,sprite)
    
def renderBackground(map,screen):
    for y in range (15):
        for x in range (20):
            if (map[y][x]=="d"):
                pygame.draw.rect(screen, (100,100,100), (50*x,50*y,50,50))
            else:
                pygame.draw.rect(screen, (0,255,0), (50*x,50*y,50,50))

def renderEntities(entities,screen,sprite):
    for i in range (1,len(entities)):
        #pygame.Sprite.spri()
        screen.blit(sprite.image,(int(entities[i][4])*50,int(entities[i][3])*50))
  
def mane():
    clock=pygame.time.Clock()
    closed_flag=False;
    screen=pygame.display.set_mode([SCREENWIDTH,SCREENHEIGHT])
    map=read_csv("map.csv")
    zombie=Sprite();
    while not closed_flag:
        Mouse_pressed,mouse_pos, keybd_tupl, closed_flag=inputs(closed_flag)
        entities=read_csv("entities.csv")
        render(map,entities,screen,zombie)
        pygame.display.flip()
        clock.tick(frame_rate)

mane()