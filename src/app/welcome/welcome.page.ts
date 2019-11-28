import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  audio: any;
  constructor(private platform: Platform, private nativeStorage: NativeStorage,
              private nativeAudio: NativeAudio, private router: Router) { }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../../assets/intro-song.mp3';
    this.audio.load();
    this.playAudio();
  }

  playAudio() {
    this.audio.play();
    this.audio.loop = true;
   }

  stopAudio() {
    this.audio.pause();
  }

  next() {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('user')
        .then( data => {
          this.router.navigate(['/tabs/tab1']);
        }, err => {
          this.router.navigate(['/tutorial']);
        });
      });
    }
  }
