//=============================================================================
// Ren_DisableBattlebackScaling.js
// ----------------------------------------------------------------------------
// Copyright (c) 2025 RenTokimiya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0 2025/05/20 初版
// ----------------------------------------------------------------------------
// [X(Twitter)]: https://x.com/StargazerNova1/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘背景の拡大縮小を無効化し、等倍表示にするプラグイン
 * @author RenTokimiya + ChatGPT(Support)
 * @url https://github.com/RenTokimiya *
 *
 * @help
 * このプラグインは、RPGツクールMZの戦闘背景（バトルバック）の
 * 自動スケーリングを無効化します。
 * 戦闘背景がボケず、原寸で表示されるようになります。
 *
 * ［利用規約］
 * このプラグインはMITライセンスで配布しています。
 */

(() => {
  const _Sprite_Battleback_adjustPosition = Sprite_Battleback.prototype.adjustPosition;
  Sprite_Battleback.prototype.adjustPosition = function () {
    // ビットマップが読み込まれていなければ従来の処理に任せる
    if (!this.bitmap || this.bitmap.width === 0 || this.bitmap.height === 0) {
      return;
    }

    // 幅・高さをビットマップのサイズに合わせる（等倍表示）
    this.move(
      (Graphics.width - this.bitmap.width) / 2, // x位置：中央寄せ
      $gameSystem.isSideView()
        ? Graphics.height - this.bitmap.height  // サイドビューなら下寄せ
        : 0,                                     // フロントビューなら上から表示
      this.bitmap.width,
      this.bitmap.height
    );

    // スケールは1（等倍）
    this.scale.x = 1;
    this.scale.y = 1;
  };
})();
