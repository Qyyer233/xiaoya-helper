// ==UserScript==
// @name         小雅自动刷
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  🚀 小雅平台自动刷课神器！视频自动播放、无缝跳转，突破防切屏限制实现后台挂机 🛡️！智能监测未开启任务倒计时 ⏳，成倍提升学习效率！📈
// @author       Qy
// @match        https://*.ai-augmented.com/*
// @grant        none
// @run-at       document-start
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDI9IjAiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjMTQyNTRhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgxMDFmIi8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImgiIGN4PSIuMTgiIGN5PSIuMSIgcj0iLjkiPjxzdG9wIHN0b3AtY29sb3I9IiMyZjZiZmYiIHN0b3Atb3BhY2l0eT0iLjQyIi8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzJmNmJmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjYwIiB5MT0iNzYwIiB4Mj0iODAwIiB5Mj0iMzAwIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iI2Q2ZjJmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg2ZGRmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGZpbHRlciBpZD0iYiIgeD0iLTQwJSIgeT0iLTQwJSIgd2lkdGg9IjE4MCUiIGhlaWdodD0iMTgwJSI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMjYiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9ImsiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNTYwIiB5MT0iMjAwIiB4Mj0iNzAwIiB5Mj0iODIwIj48c3RvcCBzdG9wLWNvbG9yPSIjYmJiIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzU1NSIvPjxzdG9wIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PG1hc2sgaWQ9Im0iPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSJ1cmwoI2spIj48cGF0aCBkPSJNNzE3LjggMjU1LjNjMCAwIDM4LjYgMzQuNyA1NC4zIDU0LjggMTUuNyAyMC4xIDI5LjIgNDIuNiAzOS43IDY1LjggMTAuNiAyMy4yIDE4LjYgNDguMyAyMy40IDczLjMgNC45IDI1IDYuOCA1MS4yIDUuNyA3Ni43LTEuMSAyNS40LTUuMyA1MS40LTEyLjMgNzUuOS03IDI0LjQtMTcuMiA0OC43LTI5LjcgNzAuOC0xMi42IDIyLjItMjguMiA0My4zLTQ1LjYgNjEuOC0xNy40IDE4LjUtMzcuNSAzNS40LTU4LjcgNDkuMi0yMS4zIDEzLjctNDQuOCAyNS4zLTY4LjcgMzMuNC0yMy44IDguMS01Ny42IDEyLjMtNzQuMiAxNS4yLTE2LjcgMy0xNy45IDEuOS0yNS44IDIuNy03LjkuOS0xNy44IDMuNS0yMS42IDIuNC0zLjctMS4xLTQuMy03LjItLjktOC45IDMuNS0xLjggMTMuNy0xIDIxLjYtMS42IDcuOS0uNSA5LjMuOSAyNS44LTEuNyAxNi40LTIuNyA0OS41LTYuNCA3Mi45LTE0LjEgMjMuNS03LjcgNDYuOC0xOC43IDY3LjgtMzIgMjEtMTMuMyA0MS0yOS43IDU4LjMtNDcuNyAxNy40LTE4LjEgMzMtMzguOCA0NS43LTYwLjYgMTIuNi0yMS43IDIyLjktNDUuNiAzMC4xLTY5LjggNy4yLTI0LjEgMTEuNi00OS45IDEyLjktNzUuMSAxLjQtMjUuMy0uMy01MS40LTQuOS03Ni4zLTQuNy0yNC45LTEyLjQtNTAtMjIuNy03My4yLTEwLjMtMjMuMS0yMy43LTQ1LjgtMzkuMi02Ni0xNS41LTIwLjEtNTMuOS01NS01My45LTU1eiIvPjxwYXRoIGQ9Ik03NzguMiAzODUuMWMwIDAgMTUuNSAzNS43IDIwLjUgNTQuMyA0LjkgMTguNiA4LjIgMzguMSA5LjUgNTcuNCAxLjMgMTkuMy42IDM5LjEtMS45IDU4LjMtMi41IDE5LjItNy4xIDM4LjYtMTMuMyA1Ny02LjMgMTguMy0xNC42IDM2LjUtMjQuNCA1My4zLTkuOCAxNi44LTIxLjUgMzMtMzQuNSA0Ny42LTEyLjkgMTQuNi0yNy43IDI4LjEtNDMuMyAzOS45LTE1LjYgMTEuOC0zMi43IDIyLjItNTAuMyAzMC42LTE3LjcgOC41LTM4LjQgMTUuNi01NS41IDIwLjMtMTcgNC43LTM1LjkgNi40LTQ2LjcgOC4xLTEwLjggMS42LTEyLjEgMS4xLTE4LjEgMS43LTYuMS42LTE1IDIuNy0xOC4xIDEuOC0zLjItLjgtMy43LTUuNi0uOC02LjkgMy0xLjQgMTIuMi0uOCAxOC4yLTEuMSA2LjEtLjQgNy41LjMgMTguMi0xLjEgMTAuNy0xLjQgMjkuMy0yLjkgNDYuMS03LjMgMTYuOS00LjQgMzcuNC0xMS4yIDU0LjgtMTkuMyAxNy41LTguMiAzNC41LTE4LjMgNTAuMS0yOS43IDE1LjUtMTEuNSAzMC4yLTI0LjggNDMuMi0zOS4xIDEyLjktMTQuMyAyNC43LTMwLjIgMzQuNi00Ni44IDkuOS0xNi41IDE4LjMtMzQuNSAyNC43LTUyLjcgNi40LTE4LjIgMTEuMS0zNy40IDEzLjgtNTYuNSAyLjctMTkuMSAzLjUtMzguOCAyLjQtNTguMS0xLjEtMTkuMi00LjItMzguNy05LjEtNTcuMy00LjgtMTguNi0yMC4xLTU0LjQtMjAuMS01NC40eiIvPjxwYXRoIGQ9Ik02MDIuMSAyNTguMWMwIDAgNDQuMiAxNy41IDYzLjcgMzAuMyAxOS42IDEyLjggMzguMSAyOC44IDUzLjcgNDYuNCAxNS42IDE3LjYgMjkuMyAzOC4xIDM5LjkgNTkuNCAxMC41IDIxLjIgMTguNiA0NC42IDIzLjMgNjcuOSA0LjcgMjMuMyA2LjUgNDguMSA1LjEgNzItMS40IDIzLjktNi4xIDQ4LjUtMTMuNyA3MS4zLTcuNSAyMi44LTE4LjQgNDUuNS0zMS43IDY1LjgtMTMuMyAyMC4yLTI5LjcgMzkuNS00Ny44IDU1LjgtMTguMiAxNi4zLTM5LjEgMzAuNy02MSA0Mi4xLTIxLjggMTEuNC01MiAyMC45LTcwLjEgMjYuMy0xOC4xIDUuNC0yOCA0LjYtMzguNSA2LjEtMTAuNCAxLjUtMTkuOSA0LjEtMjQuMSAyLjktNC4yLTEuMi00LjktOC0xLTEwIDMuOS0xLjkgMTMuOC0uNyAyNC4yLTEuOCAxMC40LTEuMiAyMC4zLS4xIDM4LTUuMSAxNy44LTUgNDcuMS0xNCA2OC41LTI0LjggMjEuNC0xMC45IDQyLjEtMjQuNyA2MC00MC40IDE3LjktMTUuOCAzNC4yLTM0LjQgNDcuNS01NC4xIDEzLjItMTkuNyAyNC4yLTQxLjkgMzEuOS02NC4yIDcuNy0yMi40IDEyLjYtNDYuNiAxNC4zLTcwLjEgMS43LTIzLjYuMi00OC4xLTQuMi03MS4zLTQuNS0yMy4xLTEyLjItNDYuNS0yMi41LTY3LjYtMTAuMi0yMS4yLTIzLjYtNDEuNy0zOS01OS40LTE1LjMtMTcuNy0zMy42LTMzLjktNTMuMS00Ni44LTE5LjQtMTIuOS02My40LTMwLjctNjMuNC0zMC43eiIvPjxwYXRoIGQ9Ik04NTEuNiA1MTMuNmMwIDAtMS42IDM2LjEtNC41IDUzLjgtMyAxNy43LTcuNCAzNS40LTEzLjEgNTIuNC01LjcgMTctMTIuOSAzMy44LTIxLjMgNDkuNi04LjQgMTUuOS0xOC4yIDMxLjItMjkuMSA0NS41LTEwLjkgMTQuMi0yMyAyNy44LTM2LjEgNDAtMTMgMTIuMy0yNy4yIDIzLjctNDIgMzMuNi0xNC44IDkuOS0zMC42IDE4LjktNDYuOSAyNi4xLTE2LjIgNy4yLTMzLjQgMTIuOS01MC42IDE3LjEtMTcuMSA0LjItNDAgNi42LTUyLjMgOC4zLTEyLjMgMS43LTE1LjMgMS4zLTIxLjMgMS45LTYgLjYtOS43IDEuMS0xNC42IDEuNi00LjkuNS0xMi4xIDIuMy0xNC43IDEuNS0yLjUtLjctMi45LTQuOC0uNi01LjkgMi40LTEuMiA5LjgtLjcgMTQuNy0xIDQuOS0uMyA4LjctLjYgMTQuNy0xIDYtLjQgOS4xLjIgMjEuMy0xLjMgMTIuMS0xLjUgMzQuOC0zLjYgNTEuOC03LjYgMTctNCAzNC4xLTkuNSA1MC4zLTE2LjUgMTYuMS02LjkgMzEuOS0xNS42IDQ2LjctMjUuMyAxNC44LTkuOCAyOS0yMC45IDQyLjEtMzMgMTMtMTIgMjUuMy0yNS40IDM2LjItMzkuNSAxMC45LTE0LjEgMjAuOS0yOS4zIDI5LjQtNDUgOC41LTE1LjcgMTUuOC0zMi40IDIxLjctNDkuMyA1LjgtMTYuOSAxMC4zLTM0LjYgMTMuNC01Mi4zIDMtMTcuNiA0LjgtNTMuNyA0LjgtNTMuN3oiLz48cGF0aCBkPSJNNzYyLjYgNjAxLjNjMCAwLTcuOSAyMi0xMi45IDMyLjUtNC45IDEwLjYtMTAuNiAyMC45LTE2LjkgMzAuNy02LjMgOS45LTEzLjMgMTkuNS0yMC45IDI4LjUtNy41IDktMTUuNyAxNy42LTI0LjQgMjUuNi04LjcgOC0xOCAxNS41LTI3LjcgMjIuNC05LjcgNi45LTIwIDEzLjItMzAuNSAxOC45LTEwLjYgNS43LTIxLjUgMTAuOS0zMi43IDE1LjQtMTEuMiA0LjQtMjQuNiA4LjYtMzQuNyAxMS4zLTEwIDIuNy0xOS40IDMuOC0yNS43IDQuOS02LjMgMS04LjEuOS0xMi4xIDEuNC00IC41LTggLjktMTIgMS40LTQuMS40LTEwIDEuOS0xMi4xIDEuMy0yLjEtLjYtMi40LTQtLjUtNSAxLjktMSA4LjEtLjUgMTIuMS0uOCA0LS4zIDguMS0uNiAxMi4xLS45IDQtLjMgNS44IDAgMTIuMS0uOSA2LjMtLjkgMTUuNi0xLjkgMjUuNi00LjQgMTAtMi42IDIzLjMtNi42IDM0LjQtMTAuOCAxMS4yLTQuMyAyMi05LjQgMzIuNS0xNC45IDEwLjUtNS41IDIwLjgtMTEuNiAzMC41LTE4LjQgOS43LTYuNyAxOS4xLTE0IDI3LjgtMjEuOSA4LjctNy45IDE3LTE2LjQgMjQuNi0yNS4zIDcuNi04LjkgMTQuNy0xOC4zIDIxLjEtMjguMSA2LjQtOS44IDEyLjItMjAgMTcuMi0zMC41IDUtMTAuNSAxMy4xLTMyLjQgMTMuMS0zMi40eiIvPjxwYXRoIGQ9Ik00NDQgMjEyLjRjMCAwIDIwLjUtNS4xIDMxLTYuOCAxMC40LTEuNyAyMS0yLjcgMzEuNi0zLjMgMTAuNi0uNSAyMS40LS40IDMyIC4yIDEwLjYuNiAyMS4zIDEuOCAzMS44IDMuNiAxMC42IDEuOCAyMS4xIDQuMiAzMS40IDcuMSAxMC4yIDIuOSAyMC41IDYuNSAzMC40IDEwLjUgOS45IDQgMTkuNyA4LjYgMjkuMSAxMy43IDkuNCA1LjEgMTguNyAxMC44IDI3LjUgMTYuOSA4LjggNi4xIDE3LjMgMTIuNyAyNS41IDE5LjcgOC4xIDcgMTUuOCAxNC41IDIzLjEgMjIuMyA3LjMgNy45IDE0LjIgMTYuMSAyMC42IDI0LjcgNi40IDguNSAxNy45IDI2LjYgMTcuOSAyNi42IDAgMC0xMS45LTE3LjgtMTguNS0yNi4xLTYuNS04LjQtMTMuNi0xNi41LTIxLTI0LjItNy41LTcuNi0xNS4zLTE0LjktMjMuNS0yMS43LTguMi02LjgtMTYuOC0xMy4yLTI1LjctMTkuMS04LjgtNS44LTE4LTExLjMtMjcuNC0xNi4yLTkuNC01LTE5LjEtOS40LTI4LjktMTMuNC05LjktMy45LTIwLTcuMy0zMC4xLTEwLjItMTAuMi0yLjktMjAuNi01LjMtMzEtNy4yLTEwLjQtMS44LTIwLjktMy4xLTMxLjQtMy45LTEwLjUtLjgtMjEuMS0xLjEtMzEuNy0uOC0xMC41LjItMjEuMSAxLTMxLjUgMi4zLTEwLjUgMS4zLTMxLjIgNS4zLTMxLjIgNS4zeiIvPjxwYXRoIGQ9Ik0zNjQuOCAyNzYuOGMwIDAgMTcuNS0xMS4zIDI2LjgtMTYuMiA5LjItNC44IDE4LjgtOS4xIDI4LjYtMTIuOSA5LjgtMy43IDE5LjktNi45IDMwLjEtOS41IDEwLjEtMi42IDIwLjUtNC42IDMxLTYgMTAuNC0xLjQgMjEtMi4yIDMxLjYtMi40IDEwLjUtLjEgMjEuMi4zIDMxLjcgMS40IDEwLjUgMSAyMSAyLjcgMzEuNCA1IDEwLjMgMi4zIDIwLjYgNS4yIDMwLjYgOC42IDEwIDMuNSAxOS44IDcuNiAyOS40IDEyLjIgOS41IDQuNiAxOC44IDkuOCAyNy43IDE1LjUgOSA1LjcgMTcuNiAxMiAyNS44IDE4LjYgOC4yIDYuNyAyMy40IDIxLjUgMjMuNCAyMS41IDAgMC0xNS42LTE0LjQtMjMuOS0yMC44LTguNC02LjQtMTcuMS0xMi40LTI2LjEtMTcuOS05LTUuNC0xOC40LTEwLjQtMjgtMTQuNy05LjUtNC40LTE5LjQtOC4yLTI5LjMtMTEuNS0xMC0zLjItMjAuMi01LjktMzAuNC04LTEwLjItMi4yLTIwLjYtMy43LTMxLTQuNy0xMC40LS45LTIwLjktMS4zLTMxLjMtMS4yLTEwLjQuMi0yMC44LjktMzEuMSAyLjItMTAuMyAxLjMtMjAuNiAzLjItMzAuNyA1LjUtMTAuMSAyLjQtMjAuMiA1LjMtMzAgOC44LTkuOCAzLjQtMTkuNCA3LjQtMjguOCAxMS44LTkuNCA0LjUtMjcuNSAxNC43LTI3LjUgMTQuN3oiLz48cGF0aCBkPSJNMjY1LjEgMzE0LjljMCAwIDkuOS0xMi40IDE1LjItMTguMiA1LjItNS44IDEwLjgtMTEuNSAxNi41LTE2LjkgNS44LTUuNCAxMS43LTEwLjYgMTcuOS0xNS41IDYuMS01IDEyLjQtOS43IDE5LTE0LjIgNi41LTQuNSAxMy4xLTguNyAyMC0xMi43IDYuOC00IDEzLjgtNy43IDIwLjktMTEuMSA3LjEtMy41IDE0LjQtNi42IDIxLjctOS41IDcuNC0yLjkgMTQuOS01LjYgMjIuNC03LjkgNy42LTIuMyAxNS4yLTQuNCAyMi45LTYuMiA3LjgtMS43IDE1LjYtMy4yIDIzLjQtNC40IDcuOC0xLjIgMTUuNy0yLjEgMjMuNi0yLjcgNy45LS42IDIzLjctLjkgMjMuNy0uOSAwIDAtMTUuOC43LTIzLjcgMS41LTcuOC44LTE1LjcgMS45LTIzLjQgMy4zLTcuOCAxLjMtMTUuNSAzLTIzLjIgNC45LTcuNiAxLjktMTUuMiA0LjEtMjIuNiA2LjUtNy41IDIuNS0xNC45IDUuMi0yMi4xIDguMi03LjMgMi45LTE0LjUgNi4yLTIxLjUgOS42LTcgMy41LTEzLjkgNy4yLTIwLjcgMTEuMS02LjggNC0xMy40IDguMS0xOS45IDEyLjUtNi41IDQuNC0xMi44IDktMTkgMTMuOC02LjIgNC45LTEyLjIgOS45LTE4LjEgMTUuMS01LjggNS4zLTExLjUgMTAuNy0xNyAxNi4zLTUuNSA1LjYtMTYgMTcuNC0xNiAxNy40eiIvPjwvZz48L21hc2s+PHBhdGggaWQ9InEiIGQ9Ik0yMzAgMGg1NjRjMTI3IDAgMjMwIDEwMyAyMzAgMjMwdjU2NGMwIDEyNy0xMDMgMjMwLTIzMCAyMzBIMjMwQzEwMyAxMDI0IDAgOTIxIDAgNzk0VjIzMEMwIDEwMyAxMDMgMCAyMzAgMHoiLz48cGF0aCBpZD0iciIgZD0iTTM4NSA3MTVjLTUtMy05LTQtMTMtNy00LTMtOC02LTEyLTktNC0zLTgtNi0xMS0xMC00LTMtNy03LTExLTEwLTMtNC02LTgtOS0xMi0zLTQtNS04LTgtMTItMy00LTYtOC04LTEyLTMtNS02LTktOS0xMy0yLTQtNC05LTYtMTMtMi01LTQtOS02LTE0LTItNC01LTgtNy0xMy0yLTUtNC05LTYtMTQtMS01LTMtMTAtNC0xNC0xLTUtMi0xMC0zLTE1LTEtNS0yLTEwLTMtMTUgMC01LTEtMTAtMS0xNiAwLTUgMC0xMCAwLTE1IDAtNS0xLTEwIDAtMTUgMC01IDItMTAgMi0xNSAxLTUgMi0xMSAzLTE2IDEtNSAyLTEwIDQtMTUgMi00IDQtOSA2LTE0IDItNCA0LTkgNy0xNCAyLTQgNC05IDctMTMgMi01IDUtOSA4LTEzIDMtNCA2LTkgOC0xMyAzLTQgNS05IDktMTMgMy00IDctNyAxMS0xMCAzLTQgNy04IDEwLTExIDQtNCA3LTggMTEtMTEgNC00IDctOCAxMS0xMSA0LTMgOC02IDEyLTkgNS0zIDktNSAxNC03IDQtMyA5LTUgMTMtOCA1LTIgOS01IDE0LTcgNC0yIDktNSAxNC03IDQtMiA5LTMgMTQtNSA1LTEgMTAtMiAxNS0zIDUtMSAxMC0yIDE1LTMgNi0xIDExLTMgMTYtNCA1LTEgMTAtMSAxNS0xIDUgMCAxMS0xIDE2LTEgNSAwIDEwIDAgMTUgMSA2IDAgMTEgMSAxNiAxIDUgMSAxMCAyIDE1IDMgNiAxIDExIDIgMTYgMyA1IDEgMTAgMyAxNSA0IDUgMiAxMCA0IDE1IDYgNSAyIDkgNCAxNCA2IDUgMyAxMCA1IDE1IDcgNCAyIDkgNSAxMyA4IDUgMyA5IDYgMTMgOSA1IDMgOSA3IDEzIDEwIDQgNCA5IDYgMTMgMTAgMyA0IDYgOCAxMCAxMiAzIDQgNyA4IDEwIDEyIDQgNCA4IDggMTEgMTMgMyA0IDcgOCAxMCAxMiAzIDUgNiAxMCA4IDE1IDMgNCA1IDEwIDcgMTUgMiA1IDQgMTAgNiAxNSAyIDUgNCAxMCA2IDE1IDEgNSAxIDExIDMgMTYgMSA1IDMgMTEgNCAxNiAxIDUgMiAxMSAyIDE2IDEgNiAxIDExIDEgMTcgMCA1IDAgMTAgMCAxNiAwIDUgMCAxMSAwIDE2LTEgNi0yIDExLTMgMTcgMCA1LTEgMTAtMiAxNi0xIDUtMSAxMS0yIDE2LTEgNi0yIDExLTQgMTctMSA1LTMgMTAtNSAxNS0yIDYtNCAxMS02IDE2LTIgNS01IDEwLTcgMTUtMyA1LTYgMTAtOCAxNS0zIDUtNiAxMC05IDE1LTMgNS02IDEwLTkgMTQtNCA1LTggOS0xMSAxMy00IDUtOCA5LTEyIDEzLTQgNC03IDEwLTExIDE0LTQgNC0xMCA2LTE0IDEwLTUgMy05IDctMTQgMTEtNSAzLTkgNy0xNCAxMC01IDMtMTAgNy0xNiAxMC01IDMtMTAgNi0xNSA5LTUgMy0xMSA1LTE2IDgtNiAzLTEyIDUtMTcgNy02IDItMTIgMy0xOCA2LTYgMy0xNyA5LTE3IDkgMCAwIDEzIDMgMTkgMyA3IDEgMTMgMCAyMC0xIDYgMCAxMy0xIDE5LTEgNy0xIDE0LTEgMjEtMiA2LTEgMTItNCAxOS02IDYtMiAxMi00IDE5LTcgNi0yIDEyLTUgMTgtOCA2LTMgMTMtNiAxOS05IDUtNCAxMS04IDE3LTExIDUtNCAxMi03IDE3LTEyIDYtNCAxMS05IDE2LTEzIDUtNSA5LTEwIDE0LTE1IDUtNSAxMS05IDE1LTE0IDUtNiA5LTExIDEzLTE3IDQtNiA4LTEyIDExLTE4IDQtNiA3LTEyIDEwLTE4IDQtNiA3LTEzIDEwLTE5IDMtNiA3LTEyIDktMTkgMy02IDQtMTMgNi0yMCAyLTcgNC0xMyA2LTIwIDItNyA0LTE0IDUtMjEgMS03IDItMTQgMi0yMSAxLTcgMS0xNCAxLTIxIDAtNyAwLTE0IDAtMjEgMC03IDAtMTQgMC0yMSAwLTctMS0xNC0yLTIxLTEtOC0yLTE1LTMtMjEtMi03LTQtMTQtNi0yMS0zLTctNS0xMy03LTIwLTMtNy01LTEzLTgtMjAtMy02LTUtMTMtOC0xOS0zLTctNy0xMy0xMC0xOS00LTYtNy0xMy0xMC0xOS00LTYtNy0xMi0xMS0xOC00LTYtOC0xMi0xMy0xOC01LTUtMTAtMTAtMTUtMTUtNS01LTEwLTExLTE1LTE2LTUtNS0xMS0xMC0xNi0xNS02LTUtMTEtOS0xNy0xNC02LTQtMTItOC0xOC0xMi03LTMtMTMtNy0xOS0xMS03LTMtMTQtNS0yMS04LTYtMy0xMy01LTIwLTgtNy0yLTE0LTUtMjAtNy03LTItMTQtNS0yMS02LTctMi0xNS0yLTIyLTQtNy0xLTE0LTItMjEtMy04LTEtMTUtMS0yMi0xLTctMS0xNS0xLTIyIDAtNyAwLTE0IDEtMjEgMi04IDEtMTUgMS0yMiAyLTcgMS0xNCAzLTIxIDQtNyAyLTE0IDUtMjEgNy03IDItMTQgMy0yMSA2LTYgMi0xMyA1LTIwIDgtNiAzLTEzIDYtMTkgOS03IDMtMTMgNi0yMCAxMC02IDMtMTIgNi0xOCAxMC02IDQtMTIgOS0xOCAxMy01IDUtMTAgMTAtMTYgMTQtNSA1LTExIDEwLTE2IDE1LTUgNS0xMCAxMC0xNSAxNS02IDUtMTEgMTAtMTUgMTYtNSA1LTggMTEtMTMgMTctNCA2LTggMTItMTIgMTgtNCA2LTggMTItMTEgMTgtMyA3LTYgMTQtOSAyMC0zIDctNiAxMy04IDIwLTMgNy01IDE0LTggMjAtMiA3LTUgMTQtNyAyMS0yIDctNSAxNC02IDIxLTEgNy0xIDE1LTIgMjItMSA3LTMgMTQtMyAyMS0xIDgtMiAxNS0yIDIyLTEgOC0xIDE1LTIgMjMgMCA3LTEgMTUtMSAyMiAxIDcgMiAxNSAzIDIyIDEgOCAzIDE1IDUgMjIgMiA4IDMgMTUgNSAyMiAyIDcgNCAxNSA3IDIyIDIgNyA1IDE0IDggMjEgMyA3IDcgMTQgMTAgMjEgNCA2IDcgMTMgMTEgMjAgNCA2IDggMTMgMTIgMTkgNSA2IDEwIDEyIDE1IDE4IDQgNiA4IDEzIDEzIDE5IDUgNiAxMSAxMSAxNyAxNiA2IDUgMTIgMTAgMTggMTUgNiA0IDEyIDkgMTggMTQgNiA0IDEzIDEwIDE5IDEzIDYgNCAxMSA3IDE3IDggNyAxIDE0IDEgMjEtMSA3LTEgMTQtNCAyMC04IDYtNCAxMi05IDE3LTE1IDUtNSA5LTEyIDEyLTE5IDMtNyA1LTE0IDYtMjIgMS03IDAtMTUtMS0yMS0yLTctNS0xNC05LTE5LTMtNS0xMC05LTE1LTEyeiIvPjxwYXRoIGlkPSJ0IiBkPSJNNDU4LjggMzg3LjlRNDM4IDM3NiA0MzggNDAwTDQzOCA2MjRRNDM4IDY0OCA0NTguOCA2MzYuMUw2NTUuMiA1MjMuOVE2NzYgNTEyIDY1NS4yIDUwMC4xeiIvPjwvZGVmcz48dXNlIGhyZWY9IiNxIiBmaWxsPSJ1cmwoI2cpIi8+PHVzZSBocmVmPSIjcSIgZmlsbD0idXJsKCNoKSIvPjx1c2UgaHJlZj0iI3IiIGZpbGw9IiMzOGI4ZmYiIG9wYWNpdHk9Ii41IiBmaWx0ZXI9InVybCgjYikiLz48dXNlIGhyZWY9IiNyIiBmaWxsPSJ1cmwoI2kpIiBtYXNrPSJ1cmwoI20pIi8+PHVzZSBocmVmPSIjdCIgZmlsbD0iIzM4YjhmZiIgb3BhY2l0eT0iLjQ1IiBmaWx0ZXI9InVybCgjYikiLz48dXNlIGhyZWY9IiN0IiBmaWxsPSIjZjVmYmZmIi8+PC9zdmc+
// ==/UserScript==

(function () {
    'use strict';

    (function injectAntiPause() {
        const s = document.createElement('script');
        s.textContent = `(function(){
            Object.defineProperty(document,'hidden',{get:()=>false,configurable:false});
            Object.defineProperty(document,'visibilityState',{get:()=>'visible',configurable:false});
            Object.defineProperty(document,'onvisibilitychange',{get:()=>null,set:()=>{},configurable:false});
            Object.defineProperty(window,'onblur',{get:()=>null,set:()=>{},configurable:false});
            Object.defineProperty(window,'onfocus',{get:()=>null,set:()=>{},configurable:false});
            const _add=EventTarget.prototype.addEventListener;
            const BLOCKED=['visibilitychange','blur','focus','focusout','pagehide'];
            EventTarget.prototype.addEventListener=function(t,fn,o){
                if(BLOCKED.includes(t)&&(this===window||this===document))return;
                return _add.call(this,t,fn,o);
            };
        })()`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
    })();

    (function injectAudioIntercept() {
        let initSilent = true;
        try {
            const pref = JSON.parse(localStorage.getItem('xy_qy_play_pref') || '{}');
            initSilent = pref.silentEnabled !== false;
        } catch(e) {}
        if (document.documentElement) {
            document.documentElement.setAttribute('data-xy-silent', initSilent ? '1' : '0');
        }
        const s = document.createElement('script');
        s.textContent = `(function(){
            var _silent=(document.documentElement.getAttribute('data-xy-silent')==='1');
            var _medias=[];
            var _connected=[];
            var _gains=[];
            var _ctx=null;
            var proto=HTMLMediaElement.prototype;
            var _oPlay=proto.play;
            function getCtx(){
                if(!_ctx){var C=window.AudioContext||window.webkitAudioContext;if(C)_ctx=new C();}
                return _ctx;
            }
            function connectGain(el){
                if(!el||_connected.indexOf(el)!==-1)return;
                try{
                    var ctx=getCtx();if(!ctx)return;
                    if(ctx.state==='suspended')ctx.resume().catch(function(){});
                    var src=ctx.createMediaElementSource(el);
                    var gn=ctx.createGain();
                    gn.gain.value=_silent?0:1;
                    src.connect(gn);gn.connect(ctx.destination);
                    _gains.push({node:gn,ctx:ctx,el:el});
                    _connected.push(el);
                }catch(e){}
            }
            function enforce(el){
                if(!el)return;
                if(_medias.indexOf(el)===-1)_medias.push(el);
                if(_silent)connectGain(el);
            }
            function refreshAll(){
                _silent=(document.documentElement.getAttribute('data-xy-silent')==='1');
                for(var i=_medias.length-1;i>=0;i--){
                    var el=_medias[i];
                    if(!el.isConnected){_medias.splice(i,1);var ci=_connected.indexOf(el);if(ci!==-1)_connected.splice(ci,1);continue;}
                    if(_silent)connectGain(el);
                }
                for(var j=0;j<_gains.length;j++){
                    try{var g=_gains[j];
                    if(g.ctx.state==='suspended')g.ctx.resume().catch(function(){});
                    g.node.gain.value=_silent?0:1;}catch(e){}
                }
            }
            document.addEventListener('click',function(){
                if(_ctx&&_ctx.state==='suspended')_ctx.resume().catch(function(){});
            },true);
            document.addEventListener('xy-silent-change',refreshAll);
            proto.play=function(){
                enforce(this);
                return _oPlay.call(this);
            };
            ['AudioContext','webkitAudioContext'].forEach(function(name){
                var Ctx=window[name];
                if(!Ctx||!Ctx.prototype||!Ctx.prototype.createMediaElementSource)return;
                var _oCMS=Ctx.prototype.createMediaElementSource;
                Ctx.prototype.createMediaElementSource=function(mediaEl){
                    var src=_oCMS.call(this,mediaEl);
                    var gn=this.createGain();
                    gn.gain.value=_silent?0:1;
                    src.connect(gn);
                    _gains.push({node:gn,ctx:this,el:mediaEl});
                    if(_medias.indexOf(mediaEl)===-1)_medias.push(mediaEl);
                    if(_connected.indexOf(mediaEl)===-1)_connected.push(mediaEl);
                    src.connect=function(){return gn.connect.apply(gn,arguments);};
                    src.disconnect=function(){return gn.disconnect.apply(gn,arguments);};
                    return src;
                };
            });
            new MutationObserver(function(muts){
                for(var i=0;i<muts.length;i++){
                    var added=muts[i].addedNodes;
                    for(var j=0;j<added.length;j++){
                        var nd=added[j];
                        if(nd.nodeType!==1)continue;
                        if(nd.tagName==='VIDEO'||nd.tagName==='AUDIO')enforce(nd);
                        if(nd.querySelectorAll){var ms=nd.querySelectorAll('video,audio');for(var k=0;k<ms.length;k++)enforce(ms[k]);}
                    }
                }
            }).observe(document,{childList:true,subtree:true});
        })()`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
    })();

    if (window.top !== window) return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main, { once: true });
    else main();

    function main() {

        const VERSION = '1.7';
        const NOTICE_API = 'https://xiaoya.qyovo.com/notice';
        const KEY = {
            tasks: 'xy_qy_tasks_v17',
            pref: 'xy_qy_play_pref',
            ui: 'xy_qy_ui_v17',
            user: 'xy_qy_user_v17',
        };
        const VIDEO_EXT = /\.(mp4|flv|avi|mov|mkv|wmv|rmvb|m4v|webm)$/i;
        const HEARTBEAT_MS = 30000;
        const STALE_MS = 30 * 60000;
        const DOC_EXTRA_S = 20;
        const VERIFY = { doc: { tries: 6, gap: 4000 }, video: { tries: 12, gap: 5000 } };
        const BALL = 52;
        const EDGE = 8;

        const store = {
            get(key, empty) {
                try {
                    const value = JSON.parse(localStorage.getItem(key));
                    return value === null || value === undefined ? empty : value;
                } catch (e) {
                    return empty;
                }
            },
            set(key, value) {
                try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
            },
        };

        ['xy_qy_task_queue', 'xy_qy_ui_pos', 'xy_user_id'].forEach(key => {
            try { localStorage.removeItem(key); } catch (e) {}
        });

        const pref = store.get(KEY.pref, {});
        const ui = Object.assign({ x: null, y: null, open: false, folded: [], seen: '', theme: null, welcomed: false }, store.get(KEY.ui, {}));
        let silent = pref.silentEnabled !== false;
        let autoResume = pref.autoResumeEnabled !== false;
        let tasks = [];
        let fetchedAt = 0;
        let loading = false;
        let notice = null;
        let noticeOpen = false;
        let run = null;
        let idleNote = null;
        let flashText = '';
        let flashTimer = null;
        let clearArmed = false;
        let clearTimer = null;
        let suppressClick = 0;
        let dragging = false;
        let obStep = 1;
        let obPick = ui.theme || 'night';

        function loadTasks() {
            const saved = store.get(KEY.tasks, {});
            tasks = Array.isArray(saved.tasks) ? saved.tasks : [];
            fetchedAt = saved.fetchedAt || 0;
        }

        const saveTasks = () => store.set(KEY.tasks, { fetchedAt, tasks });
        const saveUi = () => store.set(KEY.ui, ui);
        const savePref = () => store.set(KEY.pref, { silentEnabled: silent, autoResumeEnabled: autoResume });

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const clamp = (n, min, max) => Math.min(Math.max(n, min), Math.max(min, max));
        const pad = n => String(n).padStart(2, '0');
        const esc = s => String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
        const yes = v => v === true || v === 1 || v === '1';

        function idOf(value) {
            const text = value === null || value === undefined ? '' : String(value).trim();
            return text && text !== '_' && text !== 'null' && text !== 'undefined' ? text : null;
        }

        function parseTime(value) {
            if (value === null || value === undefined || value === '') return null;
            if (typeof value === 'number') return value < 1e12 ? value * 1000 : value;
            const text = String(value).trim();
            const m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{2})(?::(\d{2}))?$/);
            const ms = m ? new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)).getTime() : Date.parse(text);
            return Number.isFinite(ms) ? ms : null;
        }

        function clock(sec) {
            sec = Math.max(0, Math.round(sec));
            const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
            return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
        }

        function dayText(ms) {
            const d = new Date(ms), today = new Date();
            const days = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
            const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
            if (days === 0) return `今天 ${hm}`;
            if (days === 1) return `明天 ${hm}`;
            if (days === -1) return `昨天 ${hm}`;
            return `${d.getFullYear() !== today.getFullYear() ? `${d.getFullYear()}年` : ''}${d.getMonth() + 1}月${d.getDate()}日 ${hm}`;
        }

        function isNewer(latest, current) {
            if (!latest || latest === '0') return false;
            const a = latest.split('.').map(Number), b = current.split('.').map(Number);
            for (let i = 0; i < Math.max(a.length, b.length); i++) {
                if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
            }
            return false;
        }

        function page() {
            const m = location.pathname.match(/\/(mycourse|course)\/(\d+)(?:\/resource\/(\d+)\/(\d+))?/);
            return m
                ? { route: m[1], groupId: m[2], resourceId: m[3] || null, nodeId: m[4] || null }
                : { route: 'mycourse', groupId: null, resourceId: null, nodeId: null };
        }

        function token() {
            let suffixMatch = null;
            for (const cookie of document.cookie.split('; ')) {
                const i = cookie.indexOf('=');
                if (i < 0) continue;
                const name = cookie.slice(0, i);
                if (name === 'prd-access-token') return cookie.slice(i + 1);
                if (!suffixMatch && name.endsWith('access-token')) suffixMatch = cookie.slice(i + 1);
            }
            return suffixMatch;
        }

        async function api(path, body) {
            const tk = token();
            if (!tk) throw new Error('没有读到登录信息，请重新登录小雅');
            for (let attempt = 1; ; attempt++) {
                let res = null;
                try {
                    res = await fetch(path, {
                        method: body ? 'POST' : 'GET',
                        headers: body
                            ? { authorization: `Bearer ${tk}`, 'content-type': 'application/json; charset=UTF-8' }
                            : { authorization: `Bearer ${tk}` },
                        body: body ? JSON.stringify(body) : undefined,
                    });
                } catch (e) {
                    if (attempt >= 3) throw new Error('网络连接失败');
                }
                if (!res || (res.status >= 500 && attempt < 3)) {
                    await sleep(1500);
                    continue;
                }
                const data = await res.json().catch(() => null);
                if (!res.ok || !data || data.success === false) throw new Error((data && data.message) || `请求失败（HTTP ${res.status}）`);
                return data;
            }
        }

        function listOf(res) {
            const data = res && res.data;
            if (Array.isArray(data)) return data;
            for (const key of ['student_tasks', 'records', 'list', 'items', 'data']) {
                if (data && Array.isArray(data[key])) return data[key];
            }
            return [];
        }

        const taskNotices = groupId => api(`/api/jx-stat/group/task/queryTaskNotices?group_id=${groupId}&role=1`).then(listOf);

        async function resourceIndex(groupId) {
            const index = { byTask: new Map(), byNode: new Map() };
            const walk = list => {
                if (!Array.isArray(list)) return;
                for (const item of list) {
                    if (!item || typeof item !== 'object') continue;
                    if (idOf(item.task_id)) index.byTask.set(idOf(item.task_id), item);
                    if (idOf(item.node_id)) index.byNode.set(idOf(item.node_id), item);
                    walk(item.children);
                    walk(item.child_nodes);
                    walk(item.items);
                }
            };
            walk((await api(`/api/jx-iresource/resource/queryCourseResources?group_id=${groupId}`)).data);
            return index;
        }

        const resourceIdOf = res => res ? idOf(res.resource_id) || idOf(res.id) : null;

        async function userId() {
            const tail = (token() || '').slice(-12), cached = store.get(KEY.user, {});
            if (cached.id && cached.tail === tail) return cached.id;
            const id = (await api('/api/jx-auth/oauth2/info')).data.info.id;
            store.set(KEY.user, { id, tail });
            return id;
        }

        function taskState(t, now = Date.now()) {
            if (t.end && now >= t.end) return t.lateOk ? 'late' : 'expired';
            if (t.start && now < t.start) return 'locked';
            return 'ready';
        }

        const runnable = t => !t.failed && !t.blocked && (t.kind === 'video' || t.custom || t.minutes);

        function canAuto(t, now = Date.now()) {
            const state = taskState(t, now);
            return (state === 'ready' || state === 'late') && runnable(t);
        }

        function toTask(raw, groupId, groupName, index, route) {
            const nodeId = idOf(raw.node_id) || idOf(raw.nodeId);
            const taskId = idOf(raw.task_id) || idOf(raw.taskId) || idOf(raw.id) || idOf(raw.resource_id);
            const rawName = String(raw.name || '').trim();
            if (!groupId || !nodeId || !taskId || !rawName) return null;
            const res = index ? index.byTask.get(taskId) || index.byNode.get(nodeId) : null;
            const name = (res && res.name) || rawName;
            const video = res
                ? String(res.type || '').includes('video') || String(res.mimetype || '').includes('video') || VIDEO_EXT.test(name)
                : VIDEO_EXT.test(name);
            const old = tasks.find(t => t.nodeId === nodeId) || {};
            return {
                nodeId,
                taskId,
                groupId,
                groupName: groupName || old.groupName || '未分类',
                route: route || 'mycourse',
                resourceId: resourceIdOf(res) || old.resourceId || null,
                name,
                kind: video ? 'video' : 'doc',
                start: parseTime(raw.start_time),
                end: parseTime(raw.end_time),
                lateOk: yes(raw.is_allow_after_submitted),
                minutes: !video && res && Number(res.watch_min_minutes) > 0 ? Number(res.watch_min_minutes) : null,
                custom: old.custom || null,
                length: old.length || null,
            };
        }

        function sortTasks(list) {
            const now = Date.now();
            const rank = { ready: 0, late: 1, locked: 2, expired: 3 };
            const key = t => {
                const state = taskState(t, now);
                return [rank[state], (state === 'locked' ? t.start : t.end) || Infinity];
            };
            const cmp = (a, b) => a[0] - b[0] || (a[1] === b[1] ? 0 : a[1] < b[1] ? -1 : 1);
            const groupKey = new Map();
            for (const t of list) {
                const k = key(t), g = groupKey.get(t.groupId);
                if (!g || cmp(k, g) < 0) groupKey.set(t.groupId, k);
            }
            return list.slice().sort((a, b) => cmp(groupKey.get(a.groupId), groupKey.get(b.groupId))
                || a.groupName.localeCompare(b.groupName)
                || a.groupId.localeCompare(b.groupId)
                || cmp(key(a), key(b)));
        }

        async function refreshAll() {
            const now = Date.now(), keep = [], unknown = new Map();
            for (const t of listOf(await api('/api/jx-stat/group/task/un_finish'))) {
                if (Number(t.task_type) !== 1) continue;
                const end = parseTime(t.end_time), groupId = idOf(t.group_id);
                if (!end || end > now || yes(t.is_allow_after_submitted)) keep.push(t);
                else if ((t.is_allow_after_submitted === undefined || t.is_allow_after_submitted === null) && groupId) {
                    if (!unknown.has(groupId)) unknown.set(groupId, []);
                    unknown.get(groupId).push(t);
                }
            }
            const groupIds = [...new Set([...keep.map(t => idOf(t.group_id)), ...unknown.keys()])].filter(Boolean);
            const courses = new Map(await Promise.all(groupIds.map(async groupId => {
                const [index, notices] = await Promise.all([
                    resourceIndex(groupId).catch(() => null),
                    unknown.has(groupId) ? taskNotices(groupId).catch(() => []) : [],
                ]);
                return [groupId, { index, lateOk: new Set(notices.filter(n => yes(n.is_allow_after_submitted)).map(n => idOf(n.node_id))) }];
            })));
            for (const [groupId, list] of unknown) {
                for (const t of list) {
                    if (courses.get(groupId).lateOk.has(idOf(t.node_id))) keep.push(Object.assign({}, t, { is_allow_after_submitted: true }));
                }
            }
            tasks = sortTasks(keep.map(t => {
                const groupId = idOf(t.group_id);
                return toTask(t, groupId, t.group_name, groupId && courses.get(groupId).index, 'mycourse');
            }).filter(Boolean));
        }

        async function refreshCourse(groupId, route) {
            const [list, index, name] = await Promise.all([
                taskNotices(groupId),
                resourceIndex(groupId).catch(() => null),
                api(`/api/jx-iresource/group/queryGroup/${groupId}`).then(res => String((res.data && res.data.name) || '').trim()).catch(() => ''),
            ]);
            const now = Date.now();
            const fresh = list
                .filter(t => Number(t.task_type) === 1 && Number(t.finish) !== 2)
                .filter(t => {
                    const end = parseTime(t.end_time);
                    return !end || end > now || yes(t.is_allow_after_submitted);
                })
                .map(t => toTask(t, groupId, name, index, route))
                .filter(Boolean);
            tasks = sortTasks([...tasks.filter(t => t.groupId !== groupId), ...fresh]);
        }

        async function refresh() {
            if (loading) return;
            const p = page();
            loading = true;
            idleNote = null;
            render();
            try {
                if (p.groupId) await refreshCourse(p.groupId, p.route);
                else await refreshAll();
                fetchedAt = Date.now();
                saveTasks();
            } catch (e) {
                flash(`任务获取失败：${e.message}`);
            }
            loading = false;
            syncRun();
        }

        function setTask(nodeId, patch) {
            for (const t of tasks) if (t.nodeId === nodeId) Object.assign(t, patch);
            if (run && run.task.nodeId === nodeId) Object.assign(run.task, patch);
            saveTasks();
        }

        function removeTask(nodeId) {
            if (run && run.task.nodeId === nodeId) stopRun();
            tasks = tasks.filter(t => t.nodeId !== nodeId);
            saveTasks();
            render();
        }

        function clearList() {
            clearTimeout(clearTimer);
            if (!clearArmed) {
                clearArmed = true;
                clearTimer = setTimeout(() => { clearArmed = false; render(); }, 3000);
            } else {
                clearArmed = false;
                stopRun();
                tasks = [];
                saveTasks();
            }
            render();
        }

        function setDuration(nodeId, value) {
            const minutes = parseFloat(value);
            setTask(nodeId, { custom: minutes > 0 ? Math.round(minutes * 60) : null });
            render();
        }

        function syncRun() {
            const nodeId = page().nodeId;
            const task = nodeId && tasks.find(t => t.nodeId === nodeId);
            if (task && !task.failed) {
                if (!run || run.mode !== 'task' || run.task.nodeId !== nodeId) startTask(task);
            } else if (run && run.mode === 'task' && run.phase !== 'finishing') {
                stopRun();
            }
            render();
        }

        function startTask(task) {
            stopRun();
            idleNote = null;
            const now = Date.now();
            run = { mode: 'task', task, phase: 'loading', total: 0, done: 0, startedAt: now, watched: 0, lastCT: null, lastTick: now, previewTries: 0, pausedSince: 0, lastPlay: 0 };
            run.timer = setInterval(tick, 1000);
            run.beat = setInterval(heartbeat, HEARTBEAT_MS);
            tick();
            heartbeat();
        }

        function startWait(task) {
            stopRun();
            idleNote = null;
            run = { mode: 'wait', task, phase: 'waiting', total: 0, done: 0 };
            run.timer = setInterval(tick, 1000);
            tick();
        }

        function stopRun() {
            if (!run) return;
            clearInterval(run.timer);
            clearInterval(run.beat);
            if (run.abort) run.abort.abort();
            run = null;
        }

        function tick() {
            const r = run;
            if (!r || r.phase === 'finishing') return;
            if (r.mode === 'wait') {
                const t = tasks.find(x => x.nodeId === r.task.nodeId);
                if (!t) {
                    stopRun();
                    render();
                } else if (Date.now() >= t.start) {
                    stopRun();
                    goNext(t);
                }
                paint();
                return;
            }
            if (page().nodeId !== r.task.nodeId) {
                stopRun();
                render();
                return;
            }
            const lock = pageLock();
            if (lock) {
                r.phase = 'locked';
                r.startAt = lock.startAt;
                if (lock.startAt && Date.now() >= lock.startAt + 3000 && reloadAllowed(r.task.nodeId)) location.reload();
            } else if (r.task.kind === 'video') {
                tickVideo(r);
            } else {
                tickDoc(r);
            }
            paint();
        }

        function pageLock() {
            const el = document.querySelector('.aia-course-task-not-start');
            const text = el ? (el.innerText || '').replace(/\s+/g, ' ').trim() : '';
            if (!text) return null;
            const m = text.match(/任务将于(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?)开始/);
            if (m) return { startAt: parseTime(m[1].replace(/\s+/, ' ')) };
            let left = null;
            for (const [re, unit] of [[/(\d+)\s*天/, 86400], [/(\d+)\s*小时/, 3600], [/(\d+)\s*分钟/, 60], [/(\d+)\s*秒/, 1]]) {
                const hit = text.match(re);
                if (hit) left = (left || 0) + hit[1] * unit;
            }
            return { startAt: left === null ? null : Date.now() + left * 1000 };
        }

        function reloadAllowed(nodeId) {
            try {
                const key = `xy_qy_reload_${nodeId}`;
                if (Date.now() - (Number(sessionStorage.getItem(key)) || 0) < 60000) return false;
                sessionStorage.setItem(key, String(Date.now()));
                return true;
            } catch (e) {
                return false;
            }
        }

        function tickVideo(r) {
            const video = document.querySelector('video');
            if (!video) {
                r.phase = 'loading';
                return;
            }
            if (r.video !== video) attachVideo(r, video);
            const now = Date.now(), ct = video.currentTime || 0;
            const duration = Number.isFinite(video.duration) && video.duration > 1 ? video.duration : 0;
            if (duration && r.task.length !== Math.ceil(duration)) {
                setTask(r.task.nodeId, { length: Math.ceil(duration) });
                render();
            }
            if (r.lastCT !== null) {
                const delta = ct - r.lastCT;
                if (delta > 0 && delta <= (now - r.lastTick) / 1000 * 2 + 2) r.watched += delta;
            }
            r.lastCT = ct;
            r.lastTick = now;
            const custom = r.task.custom;
            r.total = custom || duration;
            r.done = custom ? r.watched : ct;
            if (video.ended || (duration && ct >= duration - 0.5) || (custom && r.watched >= custom)) {
                finish(r);
                return;
            }
            if (!video.paused) {
                r.autoplayed = true;
                r.pausedSince = 0;
                r.phase = video.readyState < 3 ? 'buffering' : 'playing';
                return;
            }
            r.pausedSince = r.pausedSince || now;
            if (!r.autoplayed && now - r.attachedAt >= 2000) {
                r.autoplayed = true;
                kick(r, video);
            } else if (r.autoplayed && autoResume) {
                kick(r, video);
            }
            r.phase = !r.autoplayed ? 'loading' : !autoResume ? 'paused' : now - r.pausedSince > 9000 ? 'blocked' : 'resuming';
        }

        function attachVideo(r, video) {
            if (r.abort) r.abort.abort();
            r.abort = new AbortController();
            r.video = video;
            r.lastCT = null;
            r.attachedAt = Date.now();
            video.addEventListener('ended', tick, { signal: r.abort.signal });
            video.addEventListener('pause', () => setTimeout(() => {
                if (r.autoplayed && autoResume) kick(r, video);
            }, 600), { signal: r.abort.signal });
        }

        function kick(r, video) {
            const now = Date.now();
            if (run !== r || r.phase === 'finishing' || !video.paused || video.ended || now - r.lastPlay < 4000) return;
            r.lastPlay = now;
            tryAutoPlay(video);
        }

        function tryAutoPlay(video) {
            const p = video.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {
                    video.muted = true;
                    const p2 = video.play();
                    if (p2 && typeof p2.finally === 'function') {
                        p2.catch(() => {}).finally(() => setTimeout(() => { video.muted = false; }, 150));
                    }
                });
            }
        }

        function tickDoc(r) {
            if (!r.previewDone && r.previewTries < 12) {
                if (document.querySelector('iframe[src*="ow365.cn"], iframe[src*="office"], .disk_previewer_with_banner iframe')) {
                    r.previewDone = true;
                } else {
                    r.previewTries++;
                    const confirm = document.querySelector('.xy_disk_preview .ant-btn-primary');
                    if (confirm) confirm.click();
                }
            }
            const t = r.task;
            const total = t.custom || (t.minutes ? Math.ceil(t.minutes * 60) + DOC_EXTRA_S : 0);
            if (!total) {
                r.phase = 'nodur';
                r.startedAt = Date.now();
                return;
            }
            r.phase = 'counting';
            r.total = total;
            r.done = (Date.now() - r.startedAt) / 1000;
            if (r.done >= total) finish(r);
        }

        async function heartbeat() {
            const r = run;
            if (!r || r.mode !== 'task' || r.phase === 'locked' || r.phase === 'nodur') return;
            const t = r.task;
            const resourceId = t.resourceId || page().resourceId;
            if (!resourceId) return;
            try {
                const message = JSON.stringify({ user_id: await userId(), group_id: t.groupId, clientType: 1, roleType: 1, resourceId });
                const timestamp = Date.now().toString(), nonce = crypto.randomUUID();
                const raw = [encodeURIComponent(message), timestamp, nonce, '--xy-create-signature--'].sort().join('');
                const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(raw));
                const signature = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
                await api('/api/jx-iresource/learnLength/learnRecord', { message, signature, timestamp, nonce });
            } catch (e) {}
        }

        async function finish(r) {
            if (run !== r || r.phase === 'finishing') return;
            r.phase = 'finishing';
            r.done = r.total;
            clearInterval(r.timer);
            clearInterval(r.beat);
            if (r.abort) r.abort.abort();
            paint();
            const t = r.task;
            if (t.kind === 'doc') {
                await api('/api/jx-iresource/resource/finishActivity', { group_id: t.groupId, node_id: t.nodeId, task_id: t.taskId }).catch(() => {});
            }
            const ok = await verify(r);
            if (run !== r) return;
            const next = nextAfter(t.nodeId);
            run = null;
            if (ok) {
                tasks = tasks.filter(x => x.nodeId !== t.nodeId);
                saveTasks();
            } else {
                setTask(t.nodeId, { failed: true });
            }
            goNext(next);
        }

        async function verify(r) {
            const { tries, gap } = VERIFY[r.task.kind];
            for (let i = 0; i < tries; i++) {
                await sleep(i ? gap : 1500);
                if (run !== r) return false;
                try {
                    const hit = (await taskNotices(r.task.groupId)).find(n => idOf(n.node_id) === r.task.nodeId);
                    if (hit && Number(hit.finish) === 2) return true;
                } catch (e) {}
            }
            return false;
        }

        function nextAfter(nodeId) {
            const i = tasks.findIndex(t => t.nodeId === nodeId), now = Date.now();
            const order = i < 0 ? tasks : [...tasks.slice(i + 1), ...tasks.slice(0, i)];
            return order.find(t => canAuto(t, now)) || null;
        }

        async function goNext(next) {
            const tried = new Set();
            while (next && !tried.has(next.nodeId)) {
                tried.add(next.nodeId);
                if (await openTask(next)) return;
                next = nextAfter(next.nodeId);
            }
            const now = Date.now();
            const soonest = tasks
                .filter(t => taskState(t, now) === 'locked' && runnable(t))
                .sort((a, b) => a.start - b.start)[0];
            if (soonest) startWait(soonest);
            else idleNote = tasks.length
                ? { label: '自动连播已结束', name: `还有 ${tasks.length} 个任务需要手动处理`, meta: '列表里标出了原因，点任务可以手动打开' }
                : { label: '全部完成', name: '列表里的任务都完成了', meta: '有新任务时点「刷新任务」获取' };
            render();
        }

        async function openTask(task) {
            let resourceId = task.resourceId;
            if (!resourceId) {
                try {
                    const index = await resourceIndex(task.groupId);
                    resourceId = resourceIdOf(index.byTask.get(task.taskId) || index.byNode.get(task.nodeId));
                    setTask(task.nodeId, resourceId ? { resourceId } : { blocked: true });
                } catch (e) {
                    flash(`打不开「${task.name}」：${e.message}`);
                    return false;
                }
            }
            if (!resourceId) {
                flash(`「${task.name}」缺少资源 ID，无法打开`);
                return false;
            }
            location.replace(`/app/jx-web/${task.route || 'mycourse'}/${task.groupId}/resource/${resourceId}/${task.nodeId}`);
            return true;
        }

        function clickTask(nodeId) {
            const task = tasks.find(t => t.nodeId === nodeId);
            if (!task) return;
            if (task.failed || task.blocked) setTask(nodeId, { failed: false, blocked: false });
            if (page().nodeId === nodeId) syncRun();
            else openTask(task);
        }

        async function loadNotice() {
            for (let attempt = 1; attempt <= 2; attempt++) {
                try {
                    const data = await (await fetch(NOTICE_API, { method: 'POST', body: JSON.stringify({ action: 'get_notice' }) })).json();
                    notice = {
                        content: String(data.content || '暂无公告'),
                        version: String(data.version || '').replace(/[^0-9.]/g, ''),
                        updatedAt: String(data.updatedAt || ''),
                    };
                    break;
                } catch (e) {
                    notice = { content: '公告加载失败', error: true };
                    if (attempt < 2) await sleep(2000);
                }
            }
            render();
        }

        const noticeKey = () => notice ? `${notice.content}|${notice.updatedAt}` : '';
        const noticeUnread = () => !!notice && !notice.error && notice.content !== '暂无公告' && ui.seen !== noticeKey();
        const hasUpdate = () => !!notice && isNewer(notice.version, VERSION);

        const LOGO = (() => {
            const shapes = '<linearGradient id="k" gradientUnits="userSpaceOnUse" x1="560" y1="200" x2="700" y2="820"><stop stop-color="#bbb"/><stop offset=".5" stop-color="#555"/><stop offset="1"/></linearGradient><mask id="m"><rect width="1024" height="1024" fill="#fff"/><g fill="url(#k)"><path d="M717.8 255.3c0 0 38.6 34.7 54.3 54.8 15.7 20.1 29.2 42.6 39.7 65.8 10.6 23.2 18.6 48.3 23.4 73.3 4.9 25 6.8 51.2 5.7 76.7-1.1 25.4-5.3 51.4-12.3 75.9-7 24.4-17.2 48.7-29.7 70.8-12.6 22.2-28.2 43.3-45.6 61.8-17.4 18.5-37.5 35.4-58.7 49.2-21.3 13.7-44.8 25.3-68.7 33.4-23.8 8.1-57.6 12.3-74.2 15.2-16.7 3-17.9 1.9-25.8 2.7-7.9.9-17.8 3.5-21.6 2.4-3.7-1.1-4.3-7.2-.9-8.9 3.5-1.8 13.7-1 21.6-1.6 7.9-.5 9.3.9 25.8-1.7 16.4-2.7 49.5-6.4 72.9-14.1 23.5-7.7 46.8-18.7 67.8-32 21-13.3 41-29.7 58.3-47.7 17.4-18.1 33-38.8 45.7-60.6 12.6-21.7 22.9-45.6 30.1-69.8 7.2-24.1 11.6-49.9 12.9-75.1 1.4-25.3-.3-51.4-4.9-76.3-4.7-24.9-12.4-50-22.7-73.2-10.3-23.1-23.7-45.8-39.2-66-15.5-20.1-53.9-55-53.9-55z"/><path d="M778.2 385.1c0 0 15.5 35.7 20.5 54.3 4.9 18.6 8.2 38.1 9.5 57.4 1.3 19.3.6 39.1-1.9 58.3-2.5 19.2-7.1 38.6-13.3 57-6.3 18.3-14.6 36.5-24.4 53.3-9.8 16.8-21.5 33-34.5 47.6-12.9 14.6-27.7 28.1-43.3 39.9-15.6 11.8-32.7 22.2-50.3 30.6-17.7 8.5-38.4 15.6-55.5 20.3-17 4.7-35.9 6.4-46.7 8.1-10.8 1.6-12.1 1.1-18.1 1.7-6.1.6-15 2.7-18.1 1.8-3.2-.8-3.7-5.6-.8-6.9 3-1.4 12.2-.8 18.2-1.1 6.1-.4 7.5.3 18.2-1.1 10.7-1.4 29.3-2.9 46.1-7.3 16.9-4.4 37.4-11.2 54.8-19.3 17.5-8.2 34.5-18.3 50.1-29.7 15.5-11.5 30.2-24.8 43.2-39.1 12.9-14.3 24.7-30.2 34.6-46.8 9.9-16.5 18.3-34.5 24.7-52.7 6.4-18.2 11.1-37.4 13.8-56.5 2.7-19.1 3.5-38.8 2.4-58.1-1.1-19.2-4.2-38.7-9.1-57.3-4.8-18.6-20.1-54.4-20.1-54.4z"/><path d="M602.1 258.1c0 0 44.2 17.5 63.7 30.3 19.6 12.8 38.1 28.8 53.7 46.4 15.6 17.6 29.3 38.1 39.9 59.4 10.5 21.2 18.6 44.6 23.3 67.9 4.7 23.3 6.5 48.1 5.1 72-1.4 23.9-6.1 48.5-13.7 71.3-7.5 22.8-18.4 45.5-31.7 65.8-13.3 20.2-29.7 39.5-47.8 55.8-18.2 16.3-39.1 30.7-61 42.1-21.8 11.4-52 20.9-70.1 26.3-18.1 5.4-28 4.6-38.5 6.1-10.4 1.5-19.9 4.1-24.1 2.9-4.2-1.2-4.9-8-1-10 3.9-1.9 13.8-.7 24.2-1.8 10.4-1.2 20.3-.1 38-5.1 17.8-5 47.1-14 68.5-24.8 21.4-10.9 42.1-24.7 60-40.4 17.9-15.8 34.2-34.4 47.5-54.1 13.2-19.7 24.2-41.9 31.9-64.2 7.7-22.4 12.6-46.6 14.3-70.1 1.7-23.6.2-48.1-4.2-71.3-4.5-23.1-12.2-46.5-22.5-67.6-10.2-21.2-23.6-41.7-39-59.4-15.3-17.7-33.6-33.9-53.1-46.8-19.4-12.9-63.4-30.7-63.4-30.7z"/><path d="M851.6 513.6c0 0-1.6 36.1-4.5 53.8-3 17.7-7.4 35.4-13.1 52.4-5.7 17-12.9 33.8-21.3 49.6-8.4 15.9-18.2 31.2-29.1 45.5-10.9 14.2-23 27.8-36.1 40-13 12.3-27.2 23.7-42 33.6-14.8 9.9-30.6 18.9-46.9 26.1-16.2 7.2-33.4 12.9-50.6 17.1-17.1 4.2-40 6.6-52.3 8.3-12.3 1.7-15.3 1.3-21.3 1.9-6 .6-9.7 1.1-14.6 1.6-4.9.5-12.1 2.3-14.7 1.5-2.5-.7-2.9-4.8-.6-5.9 2.4-1.2 9.8-.7 14.7-1 4.9-.3 8.7-.6 14.7-1 6-.4 9.1.2 21.3-1.3 12.1-1.5 34.8-3.6 51.8-7.6 17-4 34.1-9.5 50.3-16.5 16.1-6.9 31.9-15.6 46.7-25.3 14.8-9.8 29-20.9 42.1-33 13-12 25.3-25.4 36.2-39.5 10.9-14.1 20.9-29.3 29.4-45 8.5-15.7 15.8-32.4 21.7-49.3 5.8-16.9 10.3-34.6 13.4-52.3 3-17.6 4.8-53.7 4.8-53.7z"/><path d="M762.6 601.3c0 0-7.9 22-12.9 32.5-4.9 10.6-10.6 20.9-16.9 30.7-6.3 9.9-13.3 19.5-20.9 28.5-7.5 9-15.7 17.6-24.4 25.6-8.7 8-18 15.5-27.7 22.4-9.7 6.9-20 13.2-30.5 18.9-10.6 5.7-21.5 10.9-32.7 15.4-11.2 4.4-24.6 8.6-34.7 11.3-10 2.7-19.4 3.8-25.7 4.9-6.3 1-8.1.9-12.1 1.4-4 .5-8 .9-12 1.4-4.1.4-10 1.9-12.1 1.3-2.1-.6-2.4-4-.5-5 1.9-1 8.1-.5 12.1-.8 4-.3 8.1-.6 12.1-.9 4-.3 5.8 0 12.1-.9 6.3-.9 15.6-1.9 25.6-4.4 10-2.6 23.3-6.6 34.4-10.8 11.2-4.3 22-9.4 32.5-14.9 10.5-5.5 20.8-11.6 30.5-18.4 9.7-6.7 19.1-14 27.8-21.9 8.7-7.9 17-16.4 24.6-25.3 7.6-8.9 14.7-18.3 21.1-28.1 6.4-9.8 12.2-20 17.2-30.5 5-10.5 13.1-32.4 13.1-32.4z"/><path d="M444 212.4c0 0 20.5-5.1 31-6.8 10.4-1.7 21-2.7 31.6-3.3 10.6-.5 21.4-.4 32 .2 10.6.6 21.3 1.8 31.8 3.6 10.6 1.8 21.1 4.2 31.4 7.1 10.2 2.9 20.5 6.5 30.4 10.5 9.9 4 19.7 8.6 29.1 13.7 9.4 5.1 18.7 10.8 27.5 16.9 8.8 6.1 17.3 12.7 25.5 19.7 8.1 7 15.8 14.5 23.1 22.3 7.3 7.9 14.2 16.1 20.6 24.7 6.4 8.5 17.9 26.6 17.9 26.6 0 0-11.9-17.8-18.5-26.1-6.5-8.4-13.6-16.5-21-24.2-7.5-7.6-15.3-14.9-23.5-21.7-8.2-6.8-16.8-13.2-25.7-19.1-8.8-5.8-18-11.3-27.4-16.2-9.4-5-19.1-9.4-28.9-13.4-9.9-3.9-20-7.3-30.1-10.2-10.2-2.9-20.6-5.3-31-7.2-10.4-1.8-20.9-3.1-31.4-3.9-10.5-.8-21.1-1.1-31.7-.8-10.5.2-21.1 1-31.5 2.3-10.5 1.3-31.2 5.3-31.2 5.3z"/><path d="M364.8 276.8c0 0 17.5-11.3 26.8-16.2 9.2-4.8 18.8-9.1 28.6-12.9 9.8-3.7 19.9-6.9 30.1-9.5 10.1-2.6 20.5-4.6 31-6 10.4-1.4 21-2.2 31.6-2.4 10.5-.1 21.2.3 31.7 1.4 10.5 1 21 2.7 31.4 5 10.3 2.3 20.6 5.2 30.6 8.6 10 3.5 19.8 7.6 29.4 12.2 9.5 4.6 18.8 9.8 27.7 15.5 9 5.7 17.6 12 25.8 18.6 8.2 6.7 23.4 21.5 23.4 21.5 0 0-15.6-14.4-23.9-20.8-8.4-6.4-17.1-12.4-26.1-17.9-9-5.4-18.4-10.4-28-14.7-9.5-4.4-19.4-8.2-29.3-11.5-10-3.2-20.2-5.9-30.4-8-10.2-2.2-20.6-3.7-31-4.7-10.4-.9-20.9-1.3-31.3-1.2-10.4.2-20.8.9-31.1 2.2-10.3 1.3-20.6 3.2-30.7 5.5-10.1 2.4-20.2 5.3-30 8.8-9.8 3.4-19.4 7.4-28.8 11.8-9.4 4.5-27.5 14.7-27.5 14.7z"/><path d="M265.1 314.9c0 0 9.9-12.4 15.2-18.2 5.2-5.8 10.8-11.5 16.5-16.9 5.8-5.4 11.7-10.6 17.9-15.5 6.1-5 12.4-9.7 19-14.2 6.5-4.5 13.1-8.7 20-12.7 6.8-4 13.8-7.7 20.9-11.1 7.1-3.5 14.4-6.6 21.7-9.5 7.4-2.9 14.9-5.6 22.4-7.9 7.6-2.3 15.2-4.4 22.9-6.2 7.8-1.7 15.6-3.2 23.4-4.4 7.8-1.2 15.7-2.1 23.6-2.7 7.9-.6 23.7-.9 23.7-.9 0 0-15.8.7-23.7 1.5-7.8.8-15.7 1.9-23.4 3.3-7.8 1.3-15.5 3-23.2 4.9-7.6 1.9-15.2 4.1-22.6 6.5-7.5 2.5-14.9 5.2-22.1 8.2-7.3 2.9-14.5 6.2-21.5 9.6-7 3.5-13.9 7.2-20.7 11.1-6.8 4-13.4 8.1-19.9 12.5-6.5 4.4-12.8 9-19 13.8-6.2 4.9-12.2 9.9-18.1 15.1-5.8 5.3-11.5 10.7-17 16.3-5.5 5.6-16 17.4-16 17.4z"/></g></mask><path id="q" d="M230 0h564c127 0 230 103 230 230v564c0 127-103 230-230 230H230C103 1024 0 921 0 794V230C0 103 103 0 230 0z"/><path id="r" d="M385 715c-5-3-9-4-13-7-4-3-8-6-12-9-4-3-8-6-11-10-4-3-7-7-11-10-3-4-6-8-9-12-3-4-5-8-8-12-3-4-6-8-8-12-3-5-6-9-9-13-2-4-4-9-6-13-2-5-4-9-6-14-2-4-5-8-7-13-2-5-4-9-6-14-1-5-3-10-4-14-1-5-2-10-3-15-1-5-2-10-3-15 0-5-1-10-1-16 0-5 0-10 0-15 0-5-1-10 0-15 0-5 2-10 2-15 1-5 2-11 3-16 1-5 2-10 4-15 2-4 4-9 6-14 2-4 4-9 7-14 2-4 4-9 7-13 2-5 5-9 8-13 3-4 6-9 8-13 3-4 5-9 9-13 3-4 7-7 11-10 3-4 7-8 10-11 4-4 7-8 11-11 4-4 7-8 11-11 4-3 8-6 12-9 5-3 9-5 14-7 4-3 9-5 13-8 5-2 9-5 14-7 4-2 9-5 14-7 4-2 9-3 14-5 5-1 10-2 15-3 5-1 10-2 15-3 6-1 11-3 16-4 5-1 10-1 15-1 5 0 11-1 16-1 5 0 10 0 15 1 6 0 11 1 16 1 5 1 10 2 15 3 6 1 11 2 16 3 5 1 10 3 15 4 5 2 10 4 15 6 5 2 9 4 14 6 5 3 10 5 15 7 4 2 9 5 13 8 5 3 9 6 13 9 5 3 9 7 13 10 4 4 9 6 13 10 3 4 6 8 10 12 3 4 7 8 10 12 4 4 8 8 11 13 3 4 7 8 10 12 3 5 6 10 8 15 3 4 5 10 7 15 2 5 4 10 6 15 2 5 4 10 6 15 1 5 1 11 3 16 1 5 3 11 4 16 1 5 2 11 2 16 1 6 1 11 1 17 0 5 0 10 0 16 0 5 0 11 0 16-1 6-2 11-3 17 0 5-1 10-2 16-1 5-1 11-2 16-1 6-2 11-4 17-1 5-3 10-5 15-2 6-4 11-6 16-2 5-5 10-7 15-3 5-6 10-8 15-3 5-6 10-9 15-3 5-6 10-9 14-4 5-8 9-11 13-4 5-8 9-12 13-4 4-7 10-11 14-4 4-10 6-14 10-5 3-9 7-14 11-5 3-9 7-14 10-5 3-10 7-16 10-5 3-10 6-15 9-5 3-11 5-16 8-6 3-12 5-17 7-6 2-12 3-18 6-6 3-17 9-17 9 0 0 13 3 19 3 7 1 13 0 20-1 6 0 13-1 19-1 7-1 14-1 21-2 6-1 12-4 19-6 6-2 12-4 19-7 6-2 12-5 18-8 6-3 13-6 19-9 5-4 11-8 17-11 5-4 12-7 17-12 6-4 11-9 16-13 5-5 9-10 14-15 5-5 11-9 15-14 5-6 9-11 13-17 4-6 8-12 11-18 4-6 7-12 10-18 4-6 7-13 10-19 3-6 7-12 9-19 3-6 4-13 6-20 2-7 4-13 6-20 2-7 4-14 5-21 1-7 2-14 2-21 1-7 1-14 1-21 0-7 0-14 0-21 0-7 0-14 0-21 0-7-1-14-2-21-1-8-2-15-3-21-2-7-4-14-6-21-3-7-5-13-7-20-3-7-5-13-8-20-3-6-5-13-8-19-3-7-7-13-10-19-4-6-7-13-10-19-4-6-7-12-11-18-4-6-8-12-13-18-5-5-10-10-15-15-5-5-10-11-15-16-5-5-11-10-16-15-6-5-11-9-17-14-6-4-12-8-18-12-7-3-13-7-19-11-7-3-14-5-21-8-6-3-13-5-20-8-7-2-14-5-20-7-7-2-14-5-21-6-7-2-15-2-22-4-7-1-14-2-21-3-8-1-15-1-22-1-7-1-15-1-22 0-7 0-14 1-21 2-8 1-15 1-22 2-7 1-14 3-21 4-7 2-14 5-21 7-7 2-14 3-21 6-6 2-13 5-20 8-6 3-13 6-19 9-7 3-13 6-20 10-6 3-12 6-18 10-6 4-12 9-18 13-5 5-10 10-16 14-5 5-11 10-16 15-5 5-10 10-15 15-6 5-11 10-15 16-5 5-8 11-13 17-4 6-8 12-12 18-4 6-8 12-11 18-3 7-6 14-9 20-3 7-6 13-8 20-3 7-5 14-8 20-2 7-5 14-7 21-2 7-5 14-6 21-1 7-1 15-2 22-1 7-3 14-3 21-1 8-2 15-2 22-1 8-1 15-2 23 0 7-1 15-1 22 1 7 2 15 3 22 1 8 3 15 5 22 2 8 3 15 5 22 2 7 4 15 7 22 2 7 5 14 8 21 3 7 7 14 10 21 4 6 7 13 11 20 4 6 8 13 12 19 5 6 10 12 15 18 4 6 8 13 13 19 5 6 11 11 17 16 6 5 12 10 18 15 6 4 12 9 18 14 6 4 13 10 19 13 6 4 11 7 17 8 7 1 14 1 21-1 7-1 14-4 20-8 6-4 12-9 17-15 5-5 9-12 12-19 3-7 5-14 6-22 1-7 0-15-1-21-2-7-5-14-9-19-3-5-10-9-15-12z"/><path id="t" d="M458.8 387.9Q438 376 438 400L438 624Q438 648 458.8 636.1L655.2 523.9Q676 512 655.2 500.1z"/>';
            const svg = (defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs>${defs}${shapes}</defs>${body}</svg>`;
            return {
                night: svg('<linearGradient id="g" x2="0" y2="1"><stop stop-color="#14254a"/><stop offset="1" stop-color="#08101f"/></linearGradient><radialGradient id="h" cx=".18" cy=".1" r=".9"><stop stop-color="#2f6bff" stop-opacity=".42"/><stop offset=".6" stop-color="#2f6bff" stop-opacity="0"/></radialGradient><linearGradient id="i" gradientUnits="userSpaceOnUse" x1="260" y1="760" x2="800" y2="300"><stop stop-color="#fff"/><stop offset=".6" stop-color="#d6f2ff"/><stop offset="1" stop-color="#86ddff"/></linearGradient><filter id="b" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="26"/></filter>', '<use href="#q" fill="url(#g)"/><use href="#q" fill="url(#h)"/><use href="#r" fill="#38b8ff" opacity=".5" filter="url(#b)"/><use href="#r" fill="url(#i)" mask="url(#m)"/><use href="#t" fill="#38b8ff" opacity=".45" filter="url(#b)"/><use href="#t" fill="#f5fbff"/>'),
                porcelain: svg('<radialGradient id="g" cx=".32" cy=".24" r=".95"><stop stop-color="#fff"/><stop offset=".55" stop-color="#f3f6fb"/><stop offset="1" stop-color="#dfe6f1"/></radialGradient><linearGradient id="i" gradientUnits="userSpaceOnUse" x1="260" y1="760" x2="800" y2="300"><stop stop-color="#132868"/><stop offset=".55" stop-color="#1c3b94"/><stop offset="1" stop-color="#3a62c8"/></linearGradient><filter id="y" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter><filter id="z"><feGaussianBlur stdDeviation="1.4"/></filter><clipPath id="c"><use href="#r"/></clipPath>', '<use href="#q" fill="url(#g)"/><use href="#r" fill="#3159c8" opacity=".2" filter="url(#y)" mask="url(#m)"/><g mask="url(#m)"><use href="#r" fill="url(#i)"/><use href="#r" fill="none" stroke="#0a1648" stroke-opacity=".38" stroke-width="16" clip-path="url(#c)"/><g fill="#08123d" opacity=".6" filter="url(#z)" clip-path="url(#c)"><ellipse cx="260.1" cy="421.4" rx="4.3" ry="2" transform="rotate(-73 260.1 421.4)"/><ellipse cx="183.1" cy="598.2" rx="5" ry="3.8" transform="rotate(-97 183.1 598.2)"/><ellipse cx="246" cy="596.4" rx="3.7" ry="2.3" transform="rotate(-97 246 596.4)"/><ellipse cx="318.6" cy="716.2" rx="4.4" ry="3.5" transform="rotate(-145 318.6 716.2)"/><ellipse cx="312.6" cy="333" rx="4.4" ry="3.4" transform="rotate(-30 312.6 333)"/><ellipse cx="240.9" cy="423.9" rx="1.9" ry="1" transform="rotate(-84 240.9 423.9)"/></g></g><use href="#t" fill="#5677cf"/><use href="#t" fill="none" stroke="#14296b" stroke-width="10" stroke-linejoin="round"/>'),
            };
        })();
        const icon = d => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
        const ICON = {
            minimize: icon('<path d="M6 12h12"/>'),
            theme: icon('<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>'),
            refresh: icon('<path d="M20 11a8 8 0 0 0-14.9-3.9M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.9 3.9M20 20v-4h-4"/>'),
            silent: icon('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>'),
            resume: icon('<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 4.5v3.7h3.7"/><path d="M10.5 9.3v5.4l4.3-2.7z" fill="currentColor"/>'),
            remove: icon('<path d="M17 7 7 17M7 7l10 10"/>'),
            chevron: icon('<path d="m9 6 6 6-6 6"/>'),
        };
        const THEMES = {
            night: { name: '夜航', desc: '深色玻璃 · 发光光轨' },
            porcelain: { name: '青花', desc: '白釉钴蓝 · 毛笔进度' },
        };
        const STROKE = 'M2 9 C6 3.2 16 2.6 30 4.6 C96 6.4 206 5.8 300 6.2 C332 6.4 346 5.4 350 7.8 C351.6 10 342 11.6 320 11.1 C220 10.6 112 10.9 32 11.6 C16 12.1 5 12.6 2 9 Z';
        const brush = cls => `<svg class="brush ${cls}" viewBox="0 0 352 16" preserveAspectRatio="none" aria-hidden="true"><path d="${STROKE}"/></svg>`;
        const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
        const WAVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='11'%3E%3Cpath d='M0 6 Q11 0 22 6 T44 6' fill='none' stroke='%231f3f97' stroke-width='1.1'/%3E%3C/svg%3E")`;
        const SERIF = '"Cambria", "Palatino Linotype", "Book Antiqua", "Iowan Old Style", "Times New Roman", serif';
        const THIN = '"Segoe UI Variable Display", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';

        const CSS = `
        :host { all: initial; }
        .xy { position: relative; color: var(--ink); font: 400 13px/1.5 var(--ui); -webkit-font-smoothing: antialiased; }
        .xy *, .xy *::before, .xy *::after { box-sizing: border-box; }
        button, input { margin: 0; font: inherit; color: inherit; }
        button { padding: 0; border: 0; background: none; cursor: pointer; }
        button:focus-visible, input:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
        svg { display: block; }
        [hidden] { display: none !important; }

        .xy[data-theme="night"] {
            color-scheme: dark;
            --ui: "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
            --big: 200 64px/0.95 ${THIN};
            --ink: #eef3fb; --ink-2: #c3cddd; --muted: #8391a8; --faint: #5d6a82;
            --line: rgba(255, 255, 255, .08); --hover: rgba(255, 255, 255, .055); --icon: #9aa7bd; --focus: #6fd6ff;
            --accent: #6fd6ff; --ring-soft: rgba(111, 214, 255, .18); --link: #92b6ff; --label: #92b6ff; --alert: #ff6b7a;
            --urgent: #ff9a9a; --warn: #f1c27d; --waitc: #93a9cc; --good: #6ee0ad;
        }
        .xy[data-theme="porcelain"] {
            --ui: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei UI", "Microsoft YaHei", "Segoe UI", sans-serif;
            --big: 400 60px/1 ${SERIF};
            --ink: #14203d; --ink-2: #3c4864; --muted: #7b86a0; --faint: #a3acc0;
            --line: rgba(20, 32, 61, .09); --hover: rgba(31, 63, 151, .055); --icon: #56627f; --focus: #3559c7;
            --accent: #1f3f97; --ring-soft: rgba(31, 63, 151, .14); --link: #1f3f97; --label: #1f3f97; --alert: #b5372f;
            --urgent: #b5372f; --warn: #a8711c; --waitc: #5a74b0; --good: #2e7d62;
        }

        .ball { position: relative; display: block; width: ${BALL}px; height: ${BALL}px; border-radius: 15px; touch-action: none; user-select: none; transition: transform .2s cubic-bezier(.2, .8, .2, 1); }
        .ball:hover { transform: translateY(-2px); }
        .ball, .mark { background: center / cover no-repeat; }
        .xy[data-theme="night"] :is(.ball, .mark) { background-image: url("data:image/svg+xml,${encodeURIComponent(LOGO.night)}"); }
        .xy[data-theme="porcelain"] :is(.ball, .mark) { background-image: url("data:image/svg+xml,${encodeURIComponent(LOGO.porcelain)}"); }
        .ring { position: absolute; inset: -6px; padding: 2.5px; border-radius: 20px; opacity: 0; transition: opacity .3s;
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .ball.running .ring { opacity: 1; }
        .badge { position: absolute; left: 50%; bottom: -12px; transform: translateX(-50%); padding: 0 8px; border-radius: 99px; white-space: nowrap; font-size: 11px; font-weight: 600; line-height: 18px; }
        .badge:empty { display: none; }
        .dot { position: absolute; top: -4px; right: -4px; width: 11px; height: 11px; border-radius: 50%; background: var(--alert); box-shadow: 0 0 0 2px #fff; }
        .xy[data-theme="night"] .ball { box-shadow: 0 16px 30px -12px rgba(4, 10, 26, .75), 0 0 0 1px rgba(255, 255, 255, .5); }
        .xy[data-theme="night"] .ring { background: conic-gradient(#2f6bff, #6fd6ff calc(var(--p, 0) * 1turn), rgba(47, 107, 255, .2) 0); filter: drop-shadow(0 0 6px rgba(111, 214, 255, .55)); }
        .xy[data-theme="night"] .badge { background: rgba(10, 15, 24, .94); color: #fff; box-shadow: 0 0 0 1px rgba(255, 255, 255, .14); font-variant-numeric: tabular-nums; }
        .xy[data-theme="porcelain"] .ball { box-shadow: 0 14px 28px -14px rgba(20, 35, 85, .6), 0 0 0 1px rgba(255, 255, 255, .7); }
        .xy[data-theme="porcelain"] .ring { padding: 2px; background: conic-gradient(#1f3f97 calc(var(--p, 0) * 1turn), rgba(31, 63, 151, .14) 0); }
        .xy[data-theme="porcelain"] .badge { background: #fcfdfe; color: #1f3f97; font: 600 12px/18px ${SERIF}; font-variant-numeric: lining-nums tabular-nums; box-shadow: 0 0 0 1px rgba(31, 63, 151, .25); }

        .panel { position: relative; width: 400px; max-width: calc(100vw - ${EDGE * 2}px); max-height: calc(100vh - ${EDGE * 2}px); display: flex; flex-direction: column; overflow: hidden;
            transform-origin: var(--origin, top right); animation: xy-pop .22s cubic-bezier(.2, .8, .2, 1); }
        .panel > * { position: relative; }
        @keyframes xy-pop { from { opacity: 0; transform: scale(.96) translateY(-6px); } }
        .xy[data-theme="night"] .panel { border-radius: 22px; border: 1px solid rgba(255, 255, 255, .08);
            background: ${NOISE}, radial-gradient(130% 55% at -12% -8%, rgba(47, 107, 255, .46), transparent 58%), radial-gradient(70% 45% at 112% 4%, rgba(111, 214, 255, .17), transparent 62%), linear-gradient(180deg, #101a2b 0%, #0b121e 52%, #0a0f18 100%);
            box-shadow: 0 50px 90px -42px rgba(4, 10, 26, .9), 0 20px 44px -26px rgba(4, 10, 26, .6), inset 0 1px 0 rgba(255, 255, 255, .08); }
        .xy[data-theme="porcelain"] .panel { border-radius: 20px; border: 1px solid rgba(20, 32, 61, .08);
            background: radial-gradient(80% 42% at 100% 0%, rgba(59, 95, 208, .08), transparent 62%), #fcfdfe;
            box-shadow: 0 44px 80px -44px rgba(20, 35, 85, .55), 0 14px 32px -20px rgba(20, 35, 85, .3); }
        .xy[data-theme="porcelain"] .panel::before { content: ""; position: absolute; top: 0; right: 0; width: 250px; height: 190px; pointer-events: none; opacity: .2; background-image: ${WAVE};
            -webkit-mask-image: radial-gradient(farthest-side at 100% 0%, #000 25%, transparent); mask-image: radial-gradient(farthest-side at 100% 0%, #000 25%, transparent); }

        .head { display: flex; align-items: center; gap: 8px; padding: 14px 12px 2px 20px; cursor: grab; user-select: none; touch-action: none; }
        .head:active { cursor: grabbing; }
        .mark { width: 26px; height: 26px; flex: none; margin-right: 2px; border-radius: 8px; }
        .title { font-size: 13.5px; font-weight: 600; letter-spacing: .1em; white-space: nowrap; }
        .ver { color: var(--muted); font-size: 11.5px; letter-spacing: .04em; }
        .update { padding: 0 8px; border-radius: 99px; font-size: 11px; font-weight: 600; line-height: 18px; white-space: nowrap; }
        .sp { flex: 1; }
        .icon-btn { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 9px; color: var(--icon); transition: background .15s, color .15s; }
        .icon-btn:hover { background: var(--hover); color: var(--ink); }
        .icon-btn svg { width: 16px; height: 16px; }
        .xy[data-theme="night"] .mark { box-shadow: 0 0 0 1px rgba(255, 255, 255, .1); }
        .xy[data-theme="night"] .update { background: linear-gradient(135deg, #2f6bff, #4d8dff); color: #fff; }
        .xy[data-theme="porcelain"] .title { font-size: 14.5px; letter-spacing: .12em; }
        .xy[data-theme="porcelain"] .ver { font: italic 13.5px ${SERIF}; letter-spacing: 0; }
        .xy[data-theme="porcelain"] .mark { box-shadow: 0 6px 14px -6px rgba(20, 35, 85, .45); }
        .xy[data-theme="porcelain"] .update { background: #1f3f97; color: #fcfdfe; }

        .now { display: flex; flex-direction: column; padding: 16px 24px 20px; }
        .state { display: flex; align-items: center; gap: 8px; color: var(--label); font-size: 11.5px; letter-spacing: .3em; }
        .state::before { content: ""; width: 6px; height: 6px; flex: none; border-radius: 50%; background: currentColor; }
        .now[data-tone="idle"] .state { color: var(--muted); }
        .now[data-tone="warn"] .state { color: var(--warn); }
        .now[data-tone="wait"] .state { color: var(--waitc); }
        .now[data-tone="done"] .state { color: var(--good); }
        .now[data-tone="run"] .state::before, .now[data-tone="busy"] .state::before { animation: xy-breathe 1.8s ease-in-out infinite; }
        @keyframes xy-breathe { 50% { opacity: .35; } }
        .big-row { display: flex; align-items: baseline; gap: 10px; min-width: 0; margin-top: 12px; }
        .big { font: var(--big); letter-spacing: -.02em; white-space: nowrap; font-variant-numeric: lining-nums tabular-nums; }
        .unit { color: var(--muted); font-size: 12px; letter-spacing: .24em; white-space: nowrap; }
        .now-name { margin-top: 14px; font-size: 16px; font-weight: 500; line-height: 1.45; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .now-course { margin-top: 3px; color: var(--muted); font-size: 12.5px; }
        .bar { position: relative; margin-top: 18px; }
        .now-meta { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; color: var(--muted); font-size: 11.5px; letter-spacing: .04em; font-variant-numeric: lining-nums tabular-nums; }
        .brush { position: absolute; inset: 0; width: 100%; height: 100%; }
        .brush path { fill: #1f3f97; }
        .brush.track path { fill-opacity: .1; }
        .brush.ink { clip-path: inset(0 calc(100% - var(--p, 0) * 100%) 0 0); transition: clip-path .95s linear; }
        .xy[data-theme="night"] .big { color: #f5f8fd; text-shadow: 0 0 44px rgba(77, 141, 255, .4); }
        .xy[data-theme="night"] .now[data-tone="run"] .state::before { background: #6fd6ff; box-shadow: 0 0 0 4px rgba(111, 214, 255, .12), 0 0 14px #6fd6ff; }
        .xy[data-theme="night"] .bar { height: 2px; border-radius: 2px; background: rgba(255, 255, 255, .09); }
        .xy[data-theme="night"] .bar .brush { display: none; }
        .xy[data-theme="night"] .bar i { position: absolute; inset: 0 auto 0 0; width: calc(var(--p, 0) * 100%); border-radius: inherit; background: linear-gradient(90deg, #2f6bff, #6fd6ff); box-shadow: 0 0 10px rgba(111, 214, 255, .5); transition: width .95s linear; }
        .xy[data-theme="night"] .bar b { position: absolute; top: 50%; left: calc(var(--p, 0) * 100%); width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #fff;
            box-shadow: 0 0 0 3px rgba(111, 214, 255, .25), 0 0 16px #6fd6ff; transition: left .95s linear; }
        .xy[data-theme="porcelain"] .state { letter-spacing: .38em; }
        .xy[data-theme="porcelain"] .state::before { display: none; }
        .xy[data-theme="porcelain"] .big { color: #1f3f97; letter-spacing: .01em; }
        .xy[data-theme="porcelain"] .now-name { font-weight: 600; line-height: 1.5; }
        .xy[data-theme="porcelain"] .bar { height: 14px; margin-top: 16px; }
        .xy[data-theme="porcelain"] .bar i, .xy[data-theme="porcelain"] .bar b { display: none; }
        .xy[data-theme="porcelain"] .now-meta { margin-top: 6px; font: 13px ${SERIF}; letter-spacing: 0; font-variant-numeric: lining-nums tabular-nums; }

        .controls { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .ctl { display: flex; align-items: center; justify-content: center; gap: 7px; white-space: nowrap; font-size: 12.5px; transition: background .15s, border-color .15s, color .15s; }
        .ctl svg { width: 15px; height: 15px; flex: none; }
        .ctl em { width: 6px; height: 6px; flex: none; border-radius: 50%; }
        .ctl:disabled { cursor: progress; }
        .ctl:disabled svg { animation: xy-spin 1s linear infinite; }
        @keyframes xy-spin { to { transform: rotate(360deg); } }
        .xy[data-theme="night"] .controls { gap: 8px; padding: 0 16px 16px; }
        .xy[data-theme="night"] .ctl { height: 38px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .06); background: rgba(255, 255, 255, .045); color: var(--ink-2); }
        .xy[data-theme="night"] .ctl:hover { background: rgba(255, 255, 255, .08); }
        .xy[data-theme="night"] .ctl svg { color: #92b6ff; }
        .xy[data-theme="night"] .ctl.primary { border-color: rgba(120, 170, 255, .35); background: linear-gradient(135deg, rgba(47, 107, 255, .92), rgba(47, 107, 255, .55)); color: #fff; box-shadow: 0 10px 24px -12px rgba(47, 107, 255, .85); }
        .xy[data-theme="night"] .ctl.primary:hover { background: linear-gradient(135deg, #3b77ff, rgba(47, 107, 255, .72)); }
        .xy[data-theme="night"] .ctl.primary svg { color: #fff; }
        .xy[data-theme="night"] .ctl em { background: rgba(255, 255, 255, .2); }
        .xy[data-theme="night"] .ctl[aria-pressed="true"] em { background: #6fd6ff; box-shadow: 0 0 10px #6fd6ff; }
        .xy[data-theme="porcelain"] .controls { margin: 2px 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .xy[data-theme="porcelain"] .ctl { height: 46px; color: var(--ink-2); font-size: 13px; }
        .xy[data-theme="porcelain"] .ctl + .ctl { border-left: 1px solid var(--line); }
        .xy[data-theme="porcelain"] .ctl:hover { background: rgba(31, 63, 151, .04); }
        .xy[data-theme="porcelain"] .ctl svg { color: #1f3f97; }
        .xy[data-theme="porcelain"] .ctl.primary { color: #1f3f97; font-weight: 600; }
        .xy[data-theme="porcelain"] .ctl em { width: 5px; height: 5px; background: #c3cad9; }
        .xy[data-theme="porcelain"] .ctl[aria-pressed="true"] em { background: #1f3f97; }

        .notice { display: flex; align-items: center; gap: 10px; font-size: 12.5px; }
        .notice.open { align-items: flex-start; }
        .notice-tag { flex: none; display: inline-flex; align-items: center; gap: 6px; padding-top: 1px; color: var(--label); font-size: 11px; letter-spacing: .24em; }
        .notice-tag.unread::after { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--alert); }
        .notice-text { flex: 1; min-width: 0; overflow: hidden; color: var(--ink-2); text-overflow: ellipsis; white-space: nowrap; }
        .notice.open .notice-text { max-height: 168px; overflow: auto; white-space: pre-wrap; word-break: break-all; text-overflow: clip; }
        .link { flex: none; color: var(--link); font-size: 12px; }
        .link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .link.muted { color: var(--muted); }
        .link.armed { color: var(--alert); }
        .xy[data-theme="night"] .notice { margin: 0 16px; padding: 11px 14px; border-radius: 12px; background: rgba(255, 255, 255, .04); }
        .xy[data-theme="porcelain"] .notice { margin: 16px 26px 0; font-size: 13px; }
        .xy[data-theme="porcelain"] .notice-tag { font-size: 11.5px; letter-spacing: .34em; }

        .list-head { display: flex; align-items: center; gap: 8px; padding: 20px 24px 6px; }
        .lh-title { color: var(--muted); font-size: 11.5px; letter-spacing: .3em; }
        .lh-count { font-size: 12px; font-variant-numeric: lining-nums tabular-nums; }
        .synced { margin-left: auto; color: var(--faint); font-size: 11.5px; font-variant-numeric: tabular-nums; }
        .list { flex: 1 1 auto; min-height: 96px; overflow: auto; padding: 0 12px 14px; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
        .group + .group { margin-top: 2px; }
        .group-head { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px 4px; color: var(--ink-2); font-size: 12px; font-weight: 600; letter-spacing: .06em; text-align: left; }
        .group-head span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .group-head em { color: var(--faint); font-style: normal; font-weight: 400; font-variant-numeric: lining-nums tabular-nums; }
        .chev { display: grid; color: var(--faint); transition: transform .2s; }
        .chev svg { width: 11px; height: 11px; }
        .group:not(.folded) .chev { transform: rotate(90deg); }
        .group.folded .group-body { display: none; }
        .task { position: relative; display: flex; align-items: center; gap: 2px; padding-right: 6px; border-radius: 12px; transition: background .15s; }
        .task:hover { background: var(--hover); }
        .task-main { flex: 1; min-width: 0; display: flex; align-items: center; gap: 12px; padding: 10px 6px 10px 12px; border-radius: 12px; text-align: left; }
        .lead { flex: none; }
        .task-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .task-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13.5px; }
        .task-sub { margin-top: 2px; color: var(--muted); font-size: 11.5px; font-variant-numeric: tabular-nums; }
        .task-sub.urgent, .task-sub.bad { color: var(--urgent); }
        .task-sub.warn { color: var(--warn); }
        .task-sub.wait { color: var(--waitc); }
        .task-sub.off, .task.off .task-name { color: var(--faint); }
        .dur { display: flex; align-items: baseline; gap: 2px; flex: none; color: var(--faint); font-size: 11px; }
        .dur input { width: 38px; padding: 2px 0; border: 0; border-bottom: 1px dashed transparent; background: transparent; outline: none; text-align: right;
            color: var(--ink-2); font-size: 12.5px; font-variant-numeric: lining-nums tabular-nums; }
        .dur input:hover { border-bottom-color: var(--faint); }
        .dur input:focus { border-bottom: 1px solid var(--accent); color: var(--ink); }
        .dur input.auto { color: var(--faint); }
        .dur input::placeholder { color: var(--faint); }
        .dur input:placeholder-shown + span { display: none; }
        .remove { width: 26px; height: 26px; color: var(--faint); opacity: 0; }
        .task:hover .remove, .remove:focus-visible { opacity: 1; }
        .remove:hover { color: var(--urgent); }
        .empty { padding: 26px 16px 30px; color: var(--muted); font-size: 12.5px; text-align: center; }
        .empty b { display: block; margin-bottom: 3px; color: var(--ink-2); font-size: 13px; font-weight: 600; }
        .xy[data-theme="night"] .lead { width: 7px; height: 7px; border-radius: 50%; background: #4d6a99; font-size: 0; }
        .xy[data-theme="night"] .t-urgent .lead, .xy[data-theme="night"] .t-bad .lead { background: #ff8b8b; }
        .xy[data-theme="night"] .t-warn .lead { background: #f1b45c; }
        .xy[data-theme="night"] .t-wait .lead { background: transparent; box-shadow: inset 0 0 0 1.5px #6b84ad; }
        .xy[data-theme="night"] .t-off .lead { background: #3a4558; }
        .xy[data-theme="night"] .task-name { color: #e3e9f3; }
        .xy[data-theme="night"] .task.active { background: linear-gradient(90deg, rgba(47, 107, 255, .3), rgba(47, 107, 255, .12) calc(var(--p, 0) * 100%), rgba(255, 255, 255, .035) calc(var(--p, 0) * 100%)); }
        .xy[data-theme="night"] .task.active .lead { background: #6fd6ff; box-shadow: 0 0 10px #6fd6ff; }
        .xy[data-theme="night"] .task.active .task-name { color: #fff; }
        .xy[data-theme="porcelain"] .lh-title { color: #1f3f97; letter-spacing: .38em; }
        .xy[data-theme="porcelain"] .lh-count { color: var(--muted); font: 13.5px ${SERIF}; font-variant-numeric: lining-nums tabular-nums; }
        .xy[data-theme="porcelain"] .list-head { padding: 22px 26px 8px; }
        .xy[data-theme="porcelain"] .list { padding: 0 14px 16px; }
        .xy[data-theme="porcelain"] .group-head { width: calc(100% - 24px); margin: 0 12px; padding: 10px 0 6px; font-size: 12.5px; letter-spacing: .08em; }
        .xy[data-theme="porcelain"] .group + .group .group-head { border-top: 1px solid var(--line); }
        .xy[data-theme="porcelain"] .group-head em { font: 13px ${SERIF}; }
        .xy[data-theme="porcelain"] .task-main { gap: 10px; }
        .xy[data-theme="porcelain"] .lead { width: 22px; color: #1f3f97; opacity: .5; font: 15px/1 ${SERIF}; font-variant-numeric: lining-nums tabular-nums; }
        .xy[data-theme="porcelain"] .dur input { font: 14px ${SERIF}; font-variant-numeric: lining-nums tabular-nums; }
        .xy[data-theme="porcelain"] .dur input.auto, .xy[data-theme="porcelain"] .dur input:placeholder-shown { font: 11.5px var(--ui); }
        .xy[data-theme="porcelain"] .task.active { background: rgba(31, 63, 151, .065); }
        .xy[data-theme="porcelain"] .task.active .lead { opacity: 1; }
        .xy[data-theme="porcelain"] .task.active .task-name { color: #1f3f97; font-weight: 600; }
        .xy[data-theme="porcelain"] .task.active::after { content: ""; position: absolute; left: 44px; bottom: 5px; width: calc((100% - 120px) * var(--p, 0)); height: 1.5px; border-radius: 1px; background: #1f3f97; transition: width .95s linear; }

        .ob { padding-bottom: 22px; }
        .ob-body { display: flex; flex-direction: column; gap: 14px; padding: 14px 24px 0; }
        .ob-step { color: var(--label); font-size: 11.5px; letter-spacing: .3em; }
        .ob-title { margin: 0; font-size: 22px; line-height: 1.35; letter-spacing: .04em; }
        .ob-desc { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.7; }
        .ob-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 2px; }
        .ob-card { display: flex; flex-direction: column; gap: 9px; padding: 8px 8px 12px; border: 1px solid var(--line); border-radius: 16px; text-align: left; transition: border-color .2s, box-shadow .2s, transform .2s; }
        .ob-card:hover { transform: translateY(-2px); }
        .ob-card[aria-pressed="true"] { border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring-soft); }
        .ob-card b { padding: 0 4px; font-size: 14px; font-weight: 600; letter-spacing: .12em; }
        .ob-card small { margin-top: -5px; padding: 0 4px; color: var(--muted); font-size: 11.5px; }
        .ob-preview { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 6px; height: 112px; padding: 14px; overflow: hidden; border-radius: 10px; }
        .ob-preview .pl { font-size: 9.5px; letter-spacing: .3em; }
        .ob-preview .pb { font-size: 34px; line-height: 1; font-variant-numeric: lining-nums tabular-nums; }
        .ob-preview .pr { position: relative; height: 10px; margin-top: 2px; }
        .ob-preview.night { background: radial-gradient(120% 70% at 0% 0%, rgba(47, 107, 255, .5), transparent 60%), linear-gradient(180deg, #101a2b, #0a0f18); color: #f5f8fd; }
        .ob-preview.night .pl { color: #92b6ff; }
        .ob-preview.night .pb { font-family: ${THIN}; font-weight: 200; text-shadow: 0 0 24px rgba(77, 141, 255, .5); }
        .ob-preview.night .pr::before, .ob-preview.night .pr::after { content: ""; position: absolute; left: 0; top: 4px; height: 2px; border-radius: 2px; }
        .ob-preview.night .pr::before { right: 0; background: rgba(255, 255, 255, .1); }
        .ob-preview.night .pr::after { width: 46%; background: linear-gradient(90deg, #2f6bff, #6fd6ff); box-shadow: 0 0 8px #6fd6ff; }
        .ob-preview.porcelain { background: radial-gradient(90% 60% at 100% 0%, rgba(59, 95, 208, .1), transparent 62%), #fcfdfe; color: #1f3f97; box-shadow: inset 0 0 0 1px rgba(20, 32, 61, .08); }
        .ob-preview.porcelain::before { content: ""; position: absolute; top: 0; right: 0; width: 120px; height: 90px; opacity: .22; background-image: ${WAVE};
            -webkit-mask-image: radial-gradient(farthest-side at 100% 0%, #000 20%, transparent); mask-image: radial-gradient(farthest-side at 100% 0%, #000 20%, transparent); }
        .ob-preview.porcelain .pb { font-family: ${SERIF}; }
        .ob-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 4px; }
        .ob-next { height: 40px; padding: 0 22px; border-radius: 12px; font-size: 13.5px; font-weight: 600; letter-spacing: .08em; }
        .ob-list { display: flex; flex-direction: column; gap: 14px; margin: 2px 0 0; padding: 0; list-style: none; }
        .ob-list li { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 12px; align-items: start; }
        .ob-list i { font: var(--big); font-size: 30px; font-style: normal; line-height: 1; text-align: center; font-variant-numeric: lining-nums; }
        .ob-list b { display: block; font-size: 14px; font-weight: 600; }
        .ob-list span { color: var(--muted); font-size: 12.5px; line-height: 1.65; }
        .xy[data-theme="night"] .ob-title { font-weight: 300; }
        .xy[data-theme="night"] .ob-next { background: linear-gradient(135deg, #2f6bff, #4d8dff); color: #fff; box-shadow: 0 12px 26px -12px rgba(47, 107, 255, .9); }
        .xy[data-theme="night"] .ob-list i { color: #f5f8fd; text-shadow: 0 0 20px rgba(77, 141, 255, .55); }
        .xy[data-theme="porcelain"] .ob-step { letter-spacing: .38em; }
        .xy[data-theme="porcelain"] .ob-title { font-weight: 600; }
        .xy[data-theme="porcelain"] .ob-next { background: #1f3f97; color: #fcfdfe; box-shadow: 0 12px 26px -14px rgba(31, 63, 151, .7); }
        .xy[data-theme="porcelain"] .ob-list i { color: #1f3f97; }

        .flash { position: absolute; z-index: 1; width: max-content; max-width: 300px; padding: 9px 14px; border-radius: 12px; font-size: 12.5px; line-height: 1.5; animation: xy-fade .2s ease-out; }
        @keyframes xy-fade { from { opacity: 0; } }
        .xy.open .flash { left: 50%; translate: -50% 0; }
        .xy.open[data-flash="below"] .flash { top: calc(100% + 10px); }
        .xy.open[data-flash="above"] .flash { bottom: calc(100% + 10px); }
        .xy.open[data-flash="inside"] .flash { bottom: 14px; }
        .xy:not(.open) .flash { top: 10px; right: calc(100% + 14px); }
        .xy.left:not(.open) .flash { right: auto; left: calc(100% + 14px); }
        .xy[data-theme="night"] .flash { background: rgba(12, 18, 30, .96); color: #eef3fb; box-shadow: 0 16px 34px -14px rgba(0, 0, 0, .6), 0 0 0 1px rgba(255, 255, 255, .08); }
        .xy[data-theme="porcelain"] .flash { background: #14203d; color: #fcfdfe; box-shadow: 0 16px 34px -14px rgba(20, 35, 85, .55); }
        @media (prefers-reduced-motion: reduce) {
            .xy *, .xy *::before, .xy *::after { animation: none !important; transition: none !important; }
        }
        `;

        const host = document.createElement('div');
        host.style.cssText = 'position:fixed;z-index:2147483000;left:0;top:0;';
        const shadow = host.attachShadow({ mode: 'closed' });
        shadow.innerHTML = `<style>${CSS}</style><div class="xy"></div>`;
        const root = shadow.querySelector('.xy');
        document.body.appendChild(host);

        function countdown(at) {
            const sec = Math.max(0, (at - Date.now()) / 1000);
            return sec >= 86400 ? `${Math.floor(sec / 86400)} 天` : clock(sec);
        }

        function nowView() {
            const r = run;
            const base = { pct: 0, bar: false, metaL: '', metaR: '', badge: '' };
            if (!r) {
                if (idleNote) return Object.assign(base, { tone: 'done', label: idleNote.label, big: String(tasks.length), unit: tasks.length ? '个需要处理' : '个待完成', name: idleNote.name, course: idleNote.meta });
                const nodeId = page().nodeId, here = nodeId && tasks.find(t => t.nodeId === nodeId);
                const [name, course] = !tasks.length ? ['先获取任务列表', '点「刷新任务」获取所有未完成的观看任务']
                    : here && here.failed ? ['这个任务未确认完成', '在下面的列表里点它重试']
                    : nodeId && !here ? ['这个页面不在任务列表里', '在下面的列表里点一个任务开始']
                    : ['在下面的列表里点一个任务开始', '完成后会自动打开下一个任务'];
                return Object.assign(base, { tone: 'idle', label: '待机中', big: String(tasks.length), unit: '个待完成', name, course });
            }
            const t = r.task;
            if (r.mode === 'wait') {
                return Object.assign(base, { tone: 'wait', label: '等待下一个任务', big: countdown(t.start), unit: '后开始', name: t.name, course: `${t.groupName} · ${dayText(t.start)} 开始，到点自动打开`, badge: '等待' });
            }
            const known = r.total > 0, left = Math.max(0, r.total - r.done);
            const progress = {
                pct: known ? Math.min(1, r.done / r.total) : 0,
                bar: true,
                big: known ? clock(left) : '--:--',
                unit: known ? '剩余' : '',
                name: t.name,
                course: t.groupName,
                metaL: known ? `${t.kind === 'video' ? '已看' : '已停留'} ${clock(r.done)}` : '',
                metaR: known ? `共 ${clock(r.total)}` : '',
                badge: known ? clock(left) : '',
            };
            switch (r.phase) {
                case 'locked':
                    return Object.assign(base, { tone: 'wait', label: '等待开始', big: r.startAt ? countdown(r.startAt) : '--:--', unit: r.startAt ? '后开始' : '', name: t.name, course: r.startAt ? `${dayText(r.startAt)} 开始，到点自动开始` : '任务还没有开始', badge: '等待' });
                case 'loading':
                    return Object.assign(base, { tone: 'busy', label: '正在加载视频', big: '--:--', unit: '', name: t.name, course: t.groupName });
                case 'playing':
                    return Object.assign(base, progress, { tone: 'run', label: '正在播放' });
                case 'buffering':
                    return Object.assign(base, progress, { tone: 'run', label: '正在缓冲' });
                case 'resuming':
                    return Object.assign(base, progress, { tone: 'warn', label: '已暂停，正在恢复', badge: '暂停' });
                case 'paused':
                    return Object.assign(base, progress, { tone: 'warn', label: '已暂停', course: '「恢复播放」已关闭，点视频的播放键继续', badge: '暂停' });
                case 'blocked':
                    return Object.assign(base, progress, { tone: 'warn', label: '等待播放', course: '浏览器拦截了自动播放，点一下视频就能继续', badge: '暂停' });
                case 'counting':
                    return Object.assign(base, progress, { tone: 'run', label: '正在计时' });
                case 'nodur':
                    return Object.assign(base, { tone: 'warn', label: '缺少观看时长', big: '--:--', unit: '', name: t.name, course: '在列表里给它填写分钟数后开始计时' });
                default:
                    return Object.assign(base, { tone: 'busy', label: '正在确认完成', big: '0:00', unit: '', name: t.name, course: '向平台确认任务状态，确认后打开下一个', pct: 1, bar: true, badge: '确认' });
            }
        }

        function taskSub(t, now) {
            if (t.blocked) return ['缺少资源 ID，无法自动打开', 'bad'];
            if (t.failed) return ['未确认完成，点击重试', 'bad'];
            const state = taskState(t, now);
            if (state === 'expired') return ['已截止', 'off'];
            if (state === 'late') return ['已截止 · 可补交', 'warn'];
            if (state === 'locked') return [`${dayText(t.start)} 开始`, 'wait'];
            if (t.kind === 'doc' && !t.custom && !t.minutes) return ['缺少观看时长，请填写分钟数', 'bad'];
            if (!t.end) return ['没有截止时间', ''];
            const hours = (t.end - now) / 3600000;
            return [`${dayText(t.end)} 截止`, hours < 24 ? 'urgent' : hours < 72 ? 'warn' : ''];
        }

        const minutesText = sec => String(Math.round(sec / 6) / 10);

        function taskHTML(t, now, order) {
            const [sub, tone] = taskSub(t, now);
            const active = run && run.task.nodeId === t.nodeId;
            const auto = t.kind === 'video' ? t.length : t.minutes ? t.minutes * 60 : null;
            const value = t.custom ? minutesText(t.custom) : auto ? minutesText(auto) : '';
            const id = esc(t.nodeId);
            return `<div class="task t-${tone || 'plain'}${active ? ' active' : ''}${taskState(t, now) === 'expired' ? ' off' : ''}" data-id="${id}" data-kind="${t.kind}">
                <button class="task-main" data-act="open" data-id="${id}" title="${esc(t.name)}">
                    <span class="lead">${pad(order)}</span>
                    <span class="task-text"><span class="task-name">${esc(t.name)}</span><span class="task-sub ${tone}">${esc(sub)}</span></span>
                </button>
                <label class="dur" title="观看时长（分钟）。清空后恢复自动：视频播完为止，文档按老师要求的时长">
                    <input class="${t.custom ? '' : 'auto'}" data-id="${id}" value="${value}" placeholder="${t.kind === 'video' ? '自动' : '填写'}" inputmode="decimal" aria-label="观看时长（分钟）"><span>分</span>
                </label>
                <button class="icon-btn remove" data-act="remove" data-id="${id}" title="移出列表" aria-label="移出列表">${ICON.remove}</button>
            </div>`;
        }

        function listHTML() {
            if (!tasks.length) {
                return loading
                    ? '<div class="empty"><b>正在获取任务…</b>首页获取全部课程，课程页只更新这门课</div>'
                    : '<div class="empty"><b>没有待完成的观看任务</b>点「刷新任务」重新获取</div>';
            }
            const now = Date.now(), groups = [];
            for (const t of tasks) {
                const last = groups[groups.length - 1];
                if (last && last.id === t.groupId) last.items.push(t);
                else groups.push({ id: t.groupId, name: t.groupName, items: [t] });
            }
            let order = 0;
            return groups.map(g => `<section class="group${ui.folded.includes(g.id) ? ' folded' : ''}">
                <button class="group-head" data-act="fold" data-id="${esc(g.id)}"><i class="chev">${ICON.chevron}</i><span>${esc(g.name)}</span><em>${g.items.length}</em></button>
                <div class="group-body">${g.items.map(t => taskHTML(t, now, ++order)).join('')}</div>
            </section>`).join('');
        }

        const headHTML = extra => `<header class="head" data-drag>
            <span class="mark"></span><span class="title">小雅自动刷</span><span class="ver">v${VERSION}</span>${extra}
            <button class="icon-btn" data-act="close" title="收起面板" aria-label="收起面板">${ICON.minimize}</button>
        </header>`;

        function panelHTML() {
            const update = hasUpdate();
            const other = THEMES[ui.theme === 'night' ? 'porcelain' : 'night'];
            const showNoticeToggle = notice && !notice.error && notice.content !== '暂无公告';
            return `<div class="panel">
                ${headHTML(`${update ? `<span class="update" title="在脚本猫里检查更新即可升级">v${esc(notice.version)} 可用</span>` : ''}<span class="sp"></span>
                    <button class="icon-btn" data-act="theme" title="切换到「${other.name}」风格" aria-label="切换到${other.name}风格">${ICON.theme}</button>`)}
                <section class="now" data-tone="idle">
                    <div class="state"></div>
                    <div class="big-row"><span class="big"></span><span class="unit"></span></div>
                    <div class="now-name"></div>
                    <div class="now-course"></div>
                    <div class="bar" hidden>${brush('track')}${brush('ink')}<i></i><b></b></div>
                    <div class="now-meta" hidden><span></span><span></span></div>
                </section>
                <div class="controls">
                    <button class="ctl primary" data-act="refresh" ${loading ? 'disabled' : ''} title="${page().groupId ? '在课程页只更新这门课的任务' : '获取所有课程的未完成观看任务'}">${ICON.refresh}<span>${loading ? '正在获取' : '刷新任务'}</span></button>
                    <button class="ctl" data-act="silent" aria-pressed="${silent}" title="拦截视频的声音，视频照常播放">${ICON.silent}<span>拦截声音</span><em></em></button>
                    <button class="ctl" data-act="resume" aria-pressed="${autoResume}" title="视频被暂停后自动继续播放">${ICON.resume}<span>恢复播放</span><em></em></button>
                </div>
                <div class="notice${noticeOpen ? ' open' : ''}">
                    <span class="notice-tag${noticeUnread() ? ' unread' : ''}">公告</span>
                    <span class="notice-text">${esc(notice ? notice.content : '正在加载公告…')}</span>
                    ${showNoticeToggle ? `<button class="link" data-act="notice">${noticeOpen ? '收起' : '展开'}</button>` : ''}
                </div>
                <div class="list-head">
                    <span class="lh-title">待完成</span><span class="lh-count">${tasks.length}</span>
                    <span class="synced">${fetchedAt ? `${dayText(fetchedAt)} 更新` : ''}</span>
                    ${tasks.length ? `<button class="link ${clearArmed ? 'armed' : 'muted'}" data-act="clear">${clearArmed ? '再点一次清空' : '清空'}</button>` : ''}
                </div>
                <div class="list">${listHTML()}</div>
            </div>`;
        }

        function onboardingHTML() {
            const body = obStep === 1
                ? `<div class="ob-step">第 1 步 · 共 2 步</div>
                    <h2 class="ob-title">选一个面板风格</h2>
                    <p class="ob-desc">两种风格功能完全一样。选好之后，随时可以点面板右上角的半圆按钮切换。</p>
                    <div class="ob-cards">${Object.entries(THEMES).map(([id, t]) => `
                        <button class="ob-card" data-act="pick" data-id="${id}" aria-pressed="${obPick === id}">
                            <span class="ob-preview ${id}"><span class="pl">正在播放</span><span class="pb">12:34</span><span class="pr" style="--p:.46">${id === 'porcelain' ? brush('track') + brush('ink') : ''}</span></span>
                            <b>${t.name}</b><small>${t.desc}</small>
                        </button>`).join('')}
                    </div>
                    <div class="ob-actions"><span></span><button class="ob-next" data-act="ob-next">下一步</button></div>`
                : `<div class="ob-step">第 2 步 · 共 2 步</div>
                    <h2 class="ob-title">它会这样帮你刷课</h2>
                    <ol class="ob-list">
                        <li><i>1</i><div><b>点一个任务</b><span>在首页会自动列出所有未完成的观看任务，点任意一个开始。</span></div></li>
                        <li><i>2</i><div><b>自动往下刷</b><span>视频播完、文档看够老师要求的时长，向平台确认完成后，自动打开下一个。</span></div></li>
                        <li><i>3</i><div><b>放着就行</b><span>收起成小球后，外圈是进度，下方是剩余时间。</span></div></li>
                    </ol>
                    <div class="ob-actions"><button class="link muted" data-act="ob-back">上一步</button><button class="ob-next" data-act="ob-done">开始使用</button></div>`;
            return `<div class="panel ob">${headHTML('<span class="sp"></span>')}<div class="ob-body">${body}</div></div>`;
        }

        function ballHTML() {
            const dot = noticeUnread() || hasUpdate() || !ui.theme;
            return `<button class="ball" data-act="expand" data-drag title="小雅自动刷" aria-label="打开小雅自动刷面板">
                <span class="ring"></span>${dot ? '<span class="dot"></span>' : ''}<span class="badge"></span>
            </button>`;
        }

        const tpl = document.createElement('template');

        function render() {
            root.dataset.theme = ui.theme || obPick;
            root.classList.toggle('open', ui.open);
            tpl.innerHTML = (ui.open ? (ui.theme ? panelHTML() : onboardingHTML()) : ballHTML())
                + (flashText ? `<div class="flash" role="status">${esc(flashText)}</div>` : '');
            const opening = !root.querySelector('.panel');
            patch(root, tpl.content);
            paint();
            place(opening);
        }

        function patch(parent, next) {
            const now = parent.childNodes, want = next.childNodes;
            for (let i = 0; i < want.length; i++) {
                const a = now[i], b = want[i];
                if (!a) parent.appendChild(b.cloneNode(true));
                else if (a.nodeName !== b.nodeName) parent.replaceChild(b.cloneNode(true), a);
                else if (a.nodeType !== 1) {
                    if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue;
                } else {
                    for (const { name } of [...a.attributes]) if (!b.hasAttribute(name)) a.removeAttribute(name);
                    for (const { name, value } of b.attributes) if (a.getAttribute(name) !== value) a.setAttribute(name, value);
                    if (a.tagName === 'INPUT' && a !== shadow.activeElement && a.value !== b.value) a.value = b.value;
                    patch(a, b);
                }
            }
            while (now.length > want.length) parent.lastChild.remove();
        }

        function paint() {
            const v = nowView();
            const card = root.querySelector('.now');
            if (card) {
                card.dataset.tone = v.tone;
                card.style.setProperty('--p', v.pct);
                card.querySelector('.state').textContent = v.label;
                card.querySelector('.big').textContent = v.big;
                card.querySelector('.unit').textContent = v.unit;
                card.querySelector('.now-name').textContent = v.name;
                card.querySelector('.now-course').textContent = v.course;
                card.querySelector('.bar').hidden = !v.bar;
                const meta = card.querySelector('.now-meta');
                meta.hidden = !v.metaL && !v.metaR;
                meta.children[0].textContent = v.metaL;
                meta.children[1].textContent = v.metaR;
            }
            const active = root.querySelector('.task.active');
            if (active) active.style.setProperty('--p', run && run.mode === 'task' ? v.pct : 0);
            const ball = root.querySelector('.ball');
            if (ball) {
                ball.classList.toggle('running', !!run);
                ball.style.setProperty('--p', run && run.mode === 'task' ? v.pct : 0);
                ball.querySelector('.badge').textContent = run ? v.badge : '';
                ball.title = `小雅自动刷 · ${v.label}`;
            }
        }

        function flash(text) {
            flashText = text;
            clearTimeout(flashTimer);
            flashTimer = setTimeout(() => { flashText = ''; render(); }, 4200);
            render();
        }

        function place(anchor) {
            if (dragging) return;
            const w = window.innerWidth, h = window.innerHeight;
            const x = clamp(ui.x === null ? w - BALL - 24 : ui.x, EDGE, w - BALL - EDGE);
            const y = clamp(ui.y === null ? Math.round(h * 0.22) : ui.y, EDGE, h - BALL - EDGE);
            const toLeft = x + BALL / 2 > w / 2;
            root.classList.toggle('left', !toLeft);
            const panel = root.querySelector('.panel');
            if (!panel) {
                host.style.left = `${x}px`;
                host.style.top = `${y}px`;
                return;
            }
            const pw = panel.offsetWidth;
            if (anchor) panel.style.maxHeight = '';
            let top = anchor ? clamp(y, EDGE, h - panel.offsetHeight - EDGE) : parseFloat(host.style.top);
            panel.style.maxHeight = `${h - top - EDGE}px`;
            const cut = panel.scrollHeight - panel.clientHeight;
            if (cut > 1) {
                top = Math.max(EDGE, top - cut);
                panel.style.maxHeight = `${h - top - EDGE}px`;
            }
            host.style.left = `${clamp(toLeft ? x + BALL - pw : x, EDGE, w - pw - EDGE)}px`;
            host.style.top = `${top}px`;
            const ph = panel.offsetHeight;
            panel.style.setProperty('--origin', toLeft ? 'top right' : 'top left');
            root.dataset.flash = top + ph + 64 <= h ? 'below' : top >= 64 ? 'above' : 'inside';
        }

        function onPointerDown(e) {
            const handle = e.target.closest('[data-drag]');
            if (!handle || e.button !== 0 || (e.target.closest('button') && e.target.closest('button') !== handle)) return;
            e.preventDefault();
            const rect = host.getBoundingClientRect(), startX = e.clientX, startY = e.clientY;
            let moved = false;
            const move = ev => {
                const dx = ev.clientX - startX, dy = ev.clientY - startY;
                if (!moved && Math.hypot(dx, dy) < 5) return;
                moved = dragging = true;
                host.style.left = `${clamp(rect.left + dx, EDGE, window.innerWidth - rect.width - EDGE)}px`;
                host.style.top = `${clamp(rect.top + dy, EDGE, window.innerHeight - rect.height - EDGE)}px`;
            };
            const up = () => {
                document.removeEventListener('pointermove', move);
                document.removeEventListener('pointerup', up);
                document.removeEventListener('pointercancel', up);
                dragging = false;
                if (!moved) return;
                suppressClick = Date.now() + 300;
                const left = parseFloat(host.style.left);
                ui.x = ui.open && left + rect.width / 2 > window.innerWidth / 2 ? left + rect.width - BALL : left;
                ui.y = parseFloat(host.style.top);
                saveUi();
                place(true);
            };
            document.addEventListener('pointermove', move);
            document.addEventListener('pointerup', up);
            document.addEventListener('pointercancel', up);
        }

        function onClick(e) {
            const el = e.target.closest('[data-act]');
            if (!el) return;
            if (Date.now() < suppressClick) {
                e.preventDefault();
                return;
            }
            const id = el.dataset.id;
            switch (el.dataset.act) {
                case 'expand':
                    ui.open = true;
                    saveUi();
                    render();
                    break;
                case 'close':
                    ui.open = false;
                    saveUi();
                    render();
                    break;
                case 'refresh':
                    refresh();
                    break;
                case 'silent':
                    silent = !silent;
                    savePref();
                    syncSilent();
                    render();
                    break;
                case 'resume':
                    autoResume = !autoResume;
                    savePref();
                    render();
                    break;
                case 'notice':
                    noticeOpen = !noticeOpen;
                    if (noticeOpen) {
                        ui.seen = noticeKey();
                        saveUi();
                    }
                    render();
                    break;
                case 'fold':
                    ui.folded = ui.folded.includes(id) ? ui.folded.filter(x => x !== id) : [...ui.folded, id];
                    saveUi();
                    render();
                    break;
                case 'open':
                    clickTask(id);
                    break;
                case 'remove':
                    removeTask(id);
                    break;
                case 'clear':
                    clearList();
                    break;
                case 'theme':
                    ui.theme = ui.theme === 'night' ? 'porcelain' : 'night';
                    saveUi();
                    render();
                    break;
                case 'pick':
                    obPick = id;
                    render();
                    break;
                case 'ob-next':
                case 'ob-back':
                    obStep = el.dataset.act === 'ob-next' ? 2 : 1;
                    render();
                    break;
                case 'ob-done':
                    ui.theme = obPick;
                    obStep = 1;
                    saveUi();
                    render();
                    break;
            }
        }

        function syncSilent() {
            document.documentElement.setAttribute('data-xy-silent', silent ? '1' : '0');
            document.dispatchEvent(new CustomEvent('xy-silent-change'));
        }

        function onRoute() {
            const p = page();
            if (!p.groupId && !loading && (!tasks.length || Date.now() - fetchedAt > STALE_MS)) refresh();
            else syncRun();
        }

        shadow.addEventListener('click', onClick);
        shadow.addEventListener('pointerdown', onPointerDown);
        shadow.addEventListener('change', e => {
            if (e.target.matches('input[data-id]')) setDuration(e.target.dataset.id, e.target.value);
        });
        shadow.addEventListener('keydown', e => {
            if (e.key === 'Enter' && e.target.matches('input')) e.target.blur();
        });
        window.addEventListener('resize', () => place(true));
        window.addEventListener('storage', e => {
            if (e.key !== KEY.tasks || loading) return;
            loadTasks();
            syncRun();
        });

        let lastHref = location.href;
        setInterval(() => {
            if (!host.isConnected && document.body) document.body.appendChild(host);
            if (location.href !== lastHref) {
                lastHref = location.href;
                onRoute();
            }
        }, 800);
        setInterval(render, 30000);

        if (!ui.welcomed) {
            ui.welcomed = true;
            if (!ui.theme) ui.open = true;
            saveUi();
        }
        loadTasks();
        syncSilent();
        render();
        loadNotice();
        onRoute();
    }
})();
