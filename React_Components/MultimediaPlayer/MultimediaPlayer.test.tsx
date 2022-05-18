import React from 'react';
import { render, screen } from '@testing-library/react';

import MultimediaPlayer from '@components/MultimediaPlayer';

describe('MultimediaPlayer Tests', () => {
  const MultimediaPlayerMessage = 'Hello World';
  describe('MultimediaPlayer source Tests', () => {
    test('mp4', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp4', source: 'https://hi.mp4' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('webm', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'webm', source: 'https://hi.webm' }]}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('mp3', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp3', source: 'https://hi.mp3' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('ogg', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp3', source: 'https://hi.ogg' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
    test('youtube', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
  });
  describe('MultimediaPlayer video Tests', () => {
    test('mp4', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp4', source: 'https://hi.mp4' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
  });
  describe('MultimediaPlayer audio Tests', () => {
    test('mp3', () => {
      render(
        <MultimediaPlayer sources={[{ type: 'mp3', source: 'https://hi.mp4' }]}>
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
  });
  describe('MultimediaPlayer youtube Tests', () => {
    test('youtube', () => {
      render(
        <MultimediaPlayer
          sources={[{ type: 'youtube', source: 'https://hi.youtube' }]}
        >
          {MultimediaPlayerMessage}
        </MultimediaPlayer>
      );
      expect(screen.getByText(MultimediaPlayerMessage)).toBeTruthy();
      expect(screen.getByText(MultimediaPlayerMessage)).toBeInTheDocument();
    });
  });
});
